import { simplex3 } from "#lib/noise.ts";
import { createProgram } from "#lib/webgl.ts";
import { mat4 } from "gl-matrix";
import type { Background } from ".";

const ROW_SIZE = 250; // If this increases, indices need to be u32.
const VERTICES = new Float32Array(ROW_SIZE * ROW_SIZE);
const INDICES = new Uint16Array(4 * ROW_SIZE * (ROW_SIZE - 1));

let TIME = Math.random() * 1000;

function getAmplitude(x: number, y: number, time: number) {
	return simplex3((x / ROW_SIZE) * 8, (y / ROW_SIZE) * 8, time / 10);
}

for (let i = 0, j = 0; i < VERTICES.length; i++) {
	const x = (i % ROW_SIZE) | 0;
	const y = (i / ROW_SIZE) | 0;
	VERTICES[i] = getAmplitude(x, y, TIME);

	if (x < ROW_SIZE - 1) {
		INDICES[j++] = i;
		INDICES[j++] = i + 1;
	}

	if (y < ROW_SIZE - 1) {
		INDICES[j++] = i;
		INDICES[j++] = i + ROW_SIZE;
	}
}

const VS_SOURCE = `#version 300 es

	precision highp float;

	const int ROW_SIZE = ${ROW_SIZE};
	const float HALF_ROW = float(ROW_SIZE - 1) / 2.0;

	layout(location = 0) in float aAmplitude;

	uniform mat4 uModelViewMatrix;
	uniform mat4 uProjectionMatrix;

	void main() {
		int xi = gl_VertexID % ROW_SIZE;
		int zi = gl_VertexID / ROW_SIZE;

		float x = float(xi) / HALF_ROW - 1.0;
		float z = float(zi) / HALF_ROW - 1.0;

		vec4 v = vec4(x, aAmplitude, z, 1.0);

		gl_Position = uProjectionMatrix * uModelViewMatrix * v;
	}
`;

const FS_SOURCE = `#version 300 es

	precision highp float;

	out vec4 oFragColor;

	void main() {
		oFragColor = vec4(0.2, 0.8, 0.9, 1);
	}
`;

export class Tron implements Background<WebGL2RenderingContext> {
	program: WebGLProgram | null = null;

	vao: WebGLVertexArrayObject | null = null;
	vertexBuffer: WebGLBuffer | null = null;
	indexBuffer: WebGLBuffer | null = null;

	uModelViewMatrix: WebGLUniformLocation | null = null;
	uProjectionMatrix: WebGLUniformLocation | null = null;

	backgroundColor(): string {
		return "#212146";
	}

	init(canvas: HTMLCanvasElement): WebGL2RenderingContext | null {
		const gl = canvas.getContext("webgl2");
		if (!gl) return null;

		this.program = createProgram(gl, VS_SOURCE, FS_SOURCE);
		if (!this.program) return null;

		this.uModelViewMatrix = gl.getUniformLocation(
			this.program,
			"uModelViewMatrix",
		);
		this.uProjectionMatrix = gl.getUniformLocation(
			this.program,
			"uProjectionMatrix",
		);

		this.vao = gl.createVertexArray();
		gl.bindVertexArray(this.vao);

		this.vertexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, VERTICES, gl.DYNAMIC_DRAW);

		this.indexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, INDICES, gl.STATIC_DRAW);

		gl.vertexAttribPointer(0, 1, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(0);

		gl.bindVertexArray(null);

		const color = this.backgroundColor();
		const colorInt = parseInt(color.replace(/^#/, ""), 16);
		gl.clearColor(
			((colorInt >> 16) & 255) / 255.0,
			((colorInt >> 8) & 255) / 255.0,
			(colorInt & 255) / 255.0,
			1,
		);
		gl.clearDepth(1);
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LEQUAL);

		return gl;
	}

	resize(gl: WebGL2RenderingContext) {
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
	}

	simulate(seconds: number): void {
		TIME += seconds;
		for (let i = 0; i < VERTICES.length; i++) {
			const x = (i % ROW_SIZE) | 0;
			const y = (i / ROW_SIZE) | 0;
			VERTICES[i] = getAmplitude(x, y, TIME);
		}
	}

	draw(gl: WebGL2RenderingContext): void {
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		const projectionMatrix = mat4.create();
		mat4.perspective(
			projectionMatrix,
			(45 * Math.PI) / 180,
			gl.canvas.width / gl.canvas.height,
			0.1,
			100,
		);

		const modelViewMatrix = mat4.create();
		mat4.translate(modelViewMatrix, modelViewMatrix, [0, -1, -1]);
		mat4.scale(modelViewMatrix, modelViewMatrix, [10, 1.8, 10]);

		gl.useProgram(this.program);
		gl.bindVertexArray(this.vao);

		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
		gl.bufferSubData(gl.ARRAY_BUFFER, 0, VERTICES);

		gl.uniformMatrix4fv(this.uProjectionMatrix, false, projectionMatrix);
		gl.uniformMatrix4fv(this.uModelViewMatrix, false, modelViewMatrix);

		gl.drawElements(gl.LINES, INDICES.length, gl.UNSIGNED_SHORT, 0);
	}
}

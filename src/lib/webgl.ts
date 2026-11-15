export function createShader(
	gl: WebGL2RenderingContext,
	type: number,
	source: string,
): WebGLShader | null {
	const shader = gl.createShader(type);
	if (!shader) return null;

	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.error("Failed to compile shader:", gl.getShaderInfoLog(shader));
		gl.deleteShader(shader);
		return null;
	}

	return shader;
}

export function createProgram(
	gl: WebGL2RenderingContext,
	vsSource: string,
	fsSource: string,
): WebGLProgram | null {
	const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
	if (!vertexShader) return null;

	const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
	if (!fragmentShader) {
		gl.deleteShader(vertexShader);
		return null;
	}

	const program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);

	gl.detachShader(program, vertexShader);
	gl.detachShader(program, fragmentShader);
	gl.deleteShader(vertexShader);
	gl.deleteShader(fragmentShader);

	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.error("Failed to link program:", gl.getProgramInfoLog(program));
		gl.deleteProgram(program);
		return null;
	}

	return program;
}

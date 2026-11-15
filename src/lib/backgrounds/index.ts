export * from "./tron";
export * from "./fireflies";

export interface Background {
	simulate(elapsedSeconds: number): void;

	draw2d(ctx: CanvasRenderingContext2D, width: number, height: number): void;

	drawWebgl2(gl: WebGL2RenderingContext, width: number, height: number): void;
}

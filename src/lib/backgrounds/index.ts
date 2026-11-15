import { Fireflies } from "./fireflies";
import { Tron } from "./tron";

export type BackgroundCtx = CanvasRenderingContext2D | WebGL2RenderingContext;

export interface Background<T extends BackgroundCtx> {
	backgroundColor(): string;

	init(canvas: HTMLCanvasElement): T | null;

	resize(ctx: T, dpr: number): void;

	simulate(elapsedSeconds: number): void;

	draw(ctx: T): void;
}

let BACKGROUND: Background<BackgroundCtx> | null = null;

export function getBackground(seed: number) {
	const get = () => new [Fireflies, Tron][Math.floor(seed * 2)]();

	if (typeof window === "undefined") return get();

	if (!BACKGROUND) BACKGROUND = get();
	return BACKGROUND;
}

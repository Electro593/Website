import { Fireflies } from "./fireflies";
import { Tron } from "./tron";

export type BackgroundCtx = CanvasRenderingContext2D | WebGL2RenderingContext;

export interface Background<T extends BackgroundCtx> {
	name(): string;
	backgroundColor(): string;

	init(canvas: HTMLCanvasElement): T | null;

	resize(ctx: T, dpr: number): void;

	simulate(elapsedSeconds: number): void;

	draw(ctx: T): void;
}

const BACKGROUNDS = [Fireflies, Tron];

const BACKGROUND_CACHE: Map<number, Background<BackgroundCtx>> = new Map();

export function getBackgroundIndex(seed: number) {
	return Math.floor(Math.abs(seed) * 2) % BACKGROUNDS.length;
}

export function getBackground(index: number) {
	const get = () => new BACKGROUNDS[index % BACKGROUNDS.length]();

	if (typeof window === "undefined") return get();

	if (!BACKGROUND_CACHE.has(index)) BACKGROUND_CACHE.set(index, get());
	return BACKGROUND_CACHE.get(index)!;
}

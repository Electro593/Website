<script lang="ts" module>
	import { Fireflies, Tron } from "./backgrounds";

	const tron = new Tron();
	const fireflies = new Fireflies();
</script>

<script lang="ts">
	import type { SvelteHTMLElements } from "svelte/elements";

	let {
		children,
		class: className,
		...restProps
	}: SvelteHTMLElements["div"] = $props();

	let canvas: HTMLCanvasElement;
	let lastTime = 0;

	$effect(() => {
		if (window.getComputedStyle(canvas).display !== "block") return;
		const dpr = window.devicePixelRatio || 1;

		const gl = canvas.getContext("webgl2");
		const ctx = canvas.getContext("2d");
		if (!gl && !ctx) return;

		let backingWidth = 0;
		let backingHeight = 0;
		let resizePending = false;

		const observer = new ResizeObserver((entries) => {
			backingWidth = Math.round(entries[0].contentRect.width * dpr);
			backingHeight = Math.round(entries[0].contentRect.height * dpr);
			resizePending = true;
		});

		const draw = (timestamp: number) => {
			let deltaTime = (timestamp - (lastTime || timestamp)) * 0.001;
			if (deltaTime > 0.1) deltaTime = 0.1;
			lastTime = timestamp;

			if (
				resizePending &&
				(canvas.width !== backingWidth || canvas.height !== backingHeight)
			) {
				canvas.width = backingWidth;
				canvas.height = backingHeight;
				if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
				if (gl) gl.viewport(0, 0, canvas.width, canvas.height);
				resizePending = false;
			}

			const width = canvas.width / dpr;
			const height = canvas.height / dpr;

			if (gl) {
				tron.simulate(deltaTime);
				tron.drawWebgl2(gl, width, height);
			} else if (ctx) {
				fireflies.simulate(deltaTime);
				fireflies.draw2d(ctx, width, height);
			}

			animationFrame = requestAnimationFrame(draw);
		};

		observer.observe(canvas);
		let animationFrame = requestAnimationFrame(draw);

		return () => {
			cancelAnimationFrame(animationFrame);
			observer.disconnect();
		};
	});
</script>

<div class={["frame", className]} {...restProps}>
	<div class="viewport">
		<canvas aria-hidden="true" bind:this={canvas} hidden></canvas>

		<div class="gutter"></div>

		<div class="scissor">
			<div class="content">
				{@render children?.()}
			</div>
		</div>
	</div>
</div>

<style>
	/* TODO: Random, or changing, background colors */
	.frame {
		--aspect-ratio: calc(16 / 9);
		--color-frame: #444;
		--color-background: #5f8f7d;

		position: absolute;
		inset: 0;
		background-color: var(--color-frame);
		isolation: isolate;

		& > .viewport {
			position: absolute;
			inset: 2px;
			z-index: 1;
			display: flex;
			container: viewport / size;
			background-color: var(--color-background);

			& > canvas {
				position: absolute;
				inset: 0;
				z-index: 2;
				display: block;
				width: 100%;
				height: 100%;

				/* background: linear-gradient(
					to bottom,
					rgb(0 0 0 / 80%),
					rgb(0 0 0 / 20%)
				); */
			}

			& > .gutter {
				position: absolute;
				inset: 0;
				z-index: 3;
				pointer-events: none;
			}

			& > .scissor {
				position: relative;
				z-index: 5;
				display: flex;
				width: 100cqw;
				max-width: calc(100cqh * var(--aspect-ratio));
				height: calc(100cqw / var(--aspect-ratio));
				max-height: 100cqh;
				aspect-ratio: var(--aspect-ratio);
				margin: auto;
				container: scissor / inline-size;
				overflow: hidden;
				background: transparent;

				& > .content {
					position: relative;
					z-index: 4;
					width: 100%;
					height: 100%;
					container-type: inline-size;
					font-size: 1cqi;
					isolation: isolate;
				}
			}
		}
	}

	@container viewport (aspect-ratio < 16 / 9) {
		.gutter {
			background-image:
				linear-gradient(to bottom, rgb(0 0 0 / 50%), transparent 100%),
				linear-gradient(to top, rgb(0 0 0 / 50%), transparent 100%);
			background-repeat: no-repeat;
			background-position: top, bottom;
			background-size: 100% calc((100cqh - (100cqw / var(--aspect-ratio))) / 2);
		}
	}

	@container viewport (aspect-ratio > 16 / 9) {
		.gutter {
			background-image:
				linear-gradient(to right, rgb(0 0 0 / 50%), transparent 100%),
				linear-gradient(to left, rgb(0 0 0 / 50%), transparent 100%);
			background-repeat: no-repeat;
			background-position: left, right;
			background-size: calc((100cqw - (100cqh * var(--aspect-ratio))) / 2) 100%;
		}
	}
</style>

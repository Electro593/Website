<script lang="ts">
	import type { SvelteHTMLElements } from "svelte/elements";
	import { getBackground, getBackgroundIndex } from "./backgrounds";

	type BackgroundProps = SvelteHTMLElements["div"] & { seed: number };

	let {
		children,
		class: className,
		seed,
		...restProps
	}: BackgroundProps = $props();

	let backgroundIndex = $derived(getBackgroundIndex(seed));
	const background = $derived(getBackground(backgroundIndex));

	let canvas: HTMLCanvasElement | null = $state(null);
	let lastTime = 0;

	const nextBackground = () => {
		backgroundIndex++;
	};

	$effect(() => {
		if (!canvas || window.getComputedStyle(canvas).display !== "block") return;
		const dpr = window.devicePixelRatio || 1;

		const ctx = background.init(canvas);
		if (!ctx) return;

		let backingWidth = 0;
		let backingHeight = 0;
		let resizePending = false;

		const observer = new ResizeObserver((entries) => {
			backingWidth = Math.round(entries[0].contentRect.width * dpr);
			backingHeight = Math.round(entries[0].contentRect.height * dpr);
			resizePending = true;
		});

		const draw = (timestamp: number) => {
			if (!canvas) return;

			let deltaTime = (timestamp - (lastTime || timestamp)) * 0.001;
			if (deltaTime > 0.1) deltaTime = 0.1;
			lastTime = timestamp;

			if (
				resizePending &&
				(canvas.width !== backingWidth || canvas.height !== backingHeight)
			) {
				canvas.width = backingWidth;
				canvas.height = backingHeight;
				background.resize(ctx, dpr);
				resizePending = false;
			}

			background.simulate(deltaTime);
			background.draw(ctx);

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
	<div class="viewport" style:--color-background={background.backgroundColor()}>
		<figure>
			{#key background}
				<canvas aria-hidden="true" bind:this={canvas} hidden></canvas>
			{/key}
			<figcaption>
				Now showing: <button onclick={nextBackground}
					>{background.name()}</button
				>
			</figcaption>
		</figure>

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

			& > figure {
				position: absolute;
				inset: 0;
				z-index: 2;
				display: block;
				width: 100%;
				height: 100%;

				& > canvas {
					position: absolute;
					inset: 0;
					z-index: 2;
					display: block;
					width: 100%;
					height: 100%;
				}

				& > figcaption {
					position: absolute;
					bottom: 1em;
					left: 1em;
					z-index: 3;
					color: #bbb;

					& > button {
						padding: 0.25em;
						color: white;
						border: 1px solid rgb(128 128 128 / 50%);
						border-radius: 0.5em;
					}
				}
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
				pointer-events: none;
				background: transparent;

				& > .content {
					position: relative;
					z-index: 4;
					width: 100%;
					height: 100%;
					container-type: inline-size;
					font-size: 1cqi;
					pointer-events: none;
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

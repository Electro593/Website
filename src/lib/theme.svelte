<script lang="ts">
	import type { SvelteHTMLElements } from "svelte/elements";
	import "@fontsource/dejavu-serif";
	import "@fontsource/dejavu-mono";

	let { children, ...restProps }: SvelteHTMLElements["div"] = $props();
</script>

<div {...restProps}>{@render children?.()}</div>

<style>
	:root {
		interpolate-size: allow-keywords;
	}

	:where(div) {
		--color-yellow: #d4e851;
		--color-highlight: #d8e391;

		font-family: "DejaVu Serif", serif;
		color: white;
		text-shadow: 0 0 10px black;

		& :global(*) {
			user-select: none;
		}

		& :global(code),
		& :global(pre),
		& :global(kbd),
		& :global(samp) {
			font-family: "DejaVu Mono", monospace;
		}

		& :global(p) {
			line-height: 1.5;
		}

		& :global(a) {
			color: #0c0;
		}

		& :global(nav a) {
			color: inherit;
			text-decoration: none;
		}

		& :global(.bubble) {
			padding: 0.5em;
			background-color: color-mix(in srgb, black 40%, transparent);
			border: solid 0.325em #38e;
			border-radius: 1em;
			box-shadow: 0 0 10px #099673;
		}

		& :global(.anchor) {
			position: absolute;
			inset: 0;
			width: max-content;
			height: max-content;
		}

		& :global(.selectable),
		& :global(.selectable *) {
			user-select: text;
		}

		& :global(.title) {
			text-shadow: 0 0 10px #099673;
		}
	}
</style>

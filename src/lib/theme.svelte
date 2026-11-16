<script lang="ts">
	import type { SvelteHTMLElements } from "svelte/elements";
	import "@fontsource/dejavu-serif";

	let { children, ...restProps }: SvelteHTMLElements["div"] = $props();
</script>

<div {...restProps}>{@render children?.()}</div>

<style>
	:where(div) {
		--color-yellow: #d4e851;
		--color-highlight: #d8e391;

		font-family: "DejaVu Serif", serif;
		color: white;
		text-shadow: 0 0 10px black;

		& :global(*) {
			box-sizing: border-box;
			padding: 0;
			margin: 0;
			user-select: none;
		}

		& :global(button) {
			all: unset;
			cursor: pointer;
			outline: revert;
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

<script lang="ts">
	import type { SvelteHTMLElements } from "svelte/elements";

	let { children, ...restProps }: SvelteHTMLElements["div"] = $props();
</script>

<div {...restProps}>{@render children?.()}</div>

<style>
	:where(div) {
		color: white;

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

		& :global(a) {
			color: #0c0;
		}

		& :global(nav a) {
			color: inherit;
			text-decoration: none;
		}

		& :global(.bubble) {
			padding: 0.5em;
			background-color: color-mix(in srgb, black 20%, transparent);
			border: solid 0.325em blue;
			border-radius: 1em;
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
	}
</style>

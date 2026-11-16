<script lang="ts">
	import type { SvelteHTMLElements } from "svelte/elements";

	type ButtonProps =
		| (SvelteHTMLElements["a"] & { active?: never; element: "a" })
		| (SvelteHTMLElements["button"] & { active?: boolean; element: "button" });

	const {
		active,
		children,
		class: className,
		element,
		...restProps
	}: ButtonProps = $props();
</script>

<div class={["bubble", className]}>
	<svelte:element
		this={element}
		draggable="false"
		class={[active && "active"]}
		{...restProps}
	>
		{@render children?.()}
	</svelte:element>
</div>

<style>
	div {
		& > button {
			all: unset;
			cursor: pointer;
			outline: revert;
		}

		& > a,
		& > button {
			display: block;
			font-size: 2.75em;
			color: inherit;
			text-align: center;

			&:hover {
				color: var(--color-highlight);
			}

			&:active,
			&.active {
				color: var(--color-yellow);
			}
		}
	}
</style>

<script lang="ts">
	import favicon from "#lib/assets/favicon.jpg";
	import type { LayoutProps } from "./$types";

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<title>Electro_593's Portfolio</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="frame">
	<div class="viewport">
		<div class="scissor">
			<div class="content">
				{@render children()}
			</div>
		</div>
	</div>
</div>

<style>
	/* Theme */

	:where(:global(*)) {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
		user-select: none;
	}

	:where(.frame :global(button)) {
		all: unset;
		cursor: pointer;
		outline: revert;
	}

	:where(.frame :global(a)) {
		color: #0c0;
	}

	:where(.frame :global(nav a)) {
		color: inherit;
		text-decoration: none;
	}

	:where(.frame :global(.bubble)) {
		padding: 0.5em;
		background-color: color-mix(in srgb, black 20%, transparent);
		border: solid 0.325em blue;
		border-radius: 1em;
	}

	:where(.frame :global(.anchor)) {
		position: absolute;
		inset: 0;
		width: max-content;
		height: max-content;
	}

	:where(.frame :global(.selectable)),
	:where(.frame :global(.selectable *)) {
		user-select: text;
	}

	/* Page border */

	.frame {
		position: absolute;
		inset: 0;
		color: white;
		background-color: gray;
	}

	.viewport {
		--color-background: #3f3f8d;

		position: absolute;
		inset: 2px;
		display: flex;
		container-type: size;
		background-color: black;
	}

	:where(.scissor) {
		--aspect-ratio: calc(16 / 9);
	}

	/* @media (aspect-ratio >= calc((16 / 9 + 4 / 3) / 2)) {
		.scissor {
			--aspect-ratio: calc(16 / 9);
		}
	}

	@media (aspect-ratio < calc((16 / 9 + 4 / 3) / 2)) {
		.scissor {
			--aspect-ratio: calc(4 / 3);
		}
	}

	@media (aspect-ratio < calc((4 / 3 + 3 / 4) / 2)) {
		.scissor {
			--aspect-ratio: calc(3 / 4);
		}
	}

	@media (aspect-ratio < calc((3 / 4 + 9 / 16) / 2)) {
		.scissor {
			--aspect-ratio: calc(9 / 16);
		}
	} */

	.scissor {
		display: flex;
		width: 100cqw;
		max-width: calc(var(--aspect-ratio) * 100cqh);
		height: calc(1 / var(--aspect-ratio) * 100cqw);
		max-height: 100cqh;
		aspect-ratio: var(--aspect-ratio);
		margin: auto;
		container-type: inline-size;
		overflow: hidden;
	}

	.content {
		position: relative;
		width: 100%;
		height: 100%;
		container-type: inline-size;
		font-size: calc((1cqi + 1rem) / 2);
		background-color: var(--color-background);
	}
</style>

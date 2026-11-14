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
	:global(*) {
		box-sizing: border-box;
		color: black;
		text-decoration: none;
	}

	.frame {
		position: absolute;
		inset: 0;
		background-color: gray;
	}

	.viewport {
		--color-background: #3f3f8d;

		position: absolute;
		inset: 1px;
		display: flex;
		container-type: inline-size;
		background-color: black;
	}

	.scissor {
		display: flex;
		width: 100cqw;
		max-width: calc(16 / 9 * 100cqh);
		height: calc(9 / 16 * 100cqw);
		max-height: 100cqh;
		aspect-ratio: 16 / 9;
		margin: auto;
		container-type: inline-size;
		overflow: hidden;
	}

	.content {
		position: relative;
		width: 100%;
		height: 100%;
		font-size: 1cqi;
		background-color: var(--color-background);
	}

	.content > :global(*) {
		position: absolute;
		inset: 0;
		width: max-content;
		height: max-content;
	}
</style>

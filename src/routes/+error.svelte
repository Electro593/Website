<script lang="ts">
	import Button from "#lib/button.svelte";
	import { resolve } from "$app/paths";
	import type { ErrorProps } from "./$types";

	const { error }: ErrorProps = $props();
</script>

{#if typeof window !== "undefined"}
	<main class="anchor bubble">
		<h1>Crash Log</h1>
		<p><code>{new Date().toISOString()}</code></p>
		<p>
			<a href={window.location.href} rel="external"
				><code>{window.location.href}</code></a
			>
		</p>
		<p><code>{window.navigator.userAgent}</code></p>

		<h2>Details</h2>

		<p><code>{error.status}</code></p>
		<p>{error.message}</p>

		<details>
			<summary><h2>Stack Trace</h2></summary>

			<ul>
				{#each [...window.navigation.entries()].reverse() as entry (entry.id)}
					<li><a href={entry.url} rel="external">{entry.url}</a></li>
				{/each}
			</ul>
		</details>
	</main>
{/if}

<footer class="anchor">
	<nav>
		<Button element="a" href={resolve("/")} title="Home">Main Menu</Button>
	</nav>
</footer>

<style>
	main {
		position: absolute;
		width: auto;
		height: auto;
		margin: 2em 30em 8em;
		overflow-y: scroll;

		& > details > summary > h2 {
			display: inline-block;
			margin: 0;
		}
	}

	footer {
		margin: auto auto 2em;
	}
</style>

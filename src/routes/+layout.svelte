<script lang="ts">
	import favicon from "#lib/assets/favicon.jpg";
	import Background from "#lib/background.svelte";
	import Theme from "#lib/theme.svelte";
	import type { LayoutProps } from "./$types";

	let { children, data }: LayoutProps = $props();
</script>

<svelte:head>
	<title>Electro_593</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<Theme>
	<Background seed={data.backgroundSeed}>
		{@render children()}
	</Background>
</Theme>

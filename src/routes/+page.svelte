<script>
	import { resolve } from "$app/paths";
</script>

<svelte:head>
	<title>Main Menu | Electro_593</title>
</svelte:head>

<h1 class="title" title="Darn it! I just lost the game.">
	Electro_593: The Game
</h1>

<nav>
	<ul>
		<li>
			<a href={resolve("/singleplayer")} title="Projects">Singleplayer</a>
		</li>
		<li><a href={resolve("/multiplayer")} title="Groups">Multiplayer</a></li>
		<li><a href={resolve("/dlc")} title="Non-Software Work">DLC</a></li>
		<li><a href={resolve("/credits")} title="About & Contact">Credits</a></li>
		<li><a href={resolve("/changelog")} title="Blog">Changelog</a></li>
	</ul>
</nav>

<style>
	h1 {
		padding: 0;
		margin: 0;
		margin: 0.5em auto auto;
		font-size: 6em;
		text-shadow: 0 0 10px #099673;
	}

	nav {
		top: 40%;
		padding-top: 6em;
		margin: auto auto auto 8em;

		& > ul {
			display: flex;
			flex-direction: column;
			gap: 1.5em;
			padding: 0;
			margin: 0;
			list-style: none;

			& > li {
				padding: 0.25em;
				font-size: 3em;
				border: solid 0.125em blue;
				border-radius: 0.5em;

				& > a {
					display: block;
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>

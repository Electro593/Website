<script>
	import { resolve } from "$app/paths";
</script>

<svelte:head>
	<title>Main Menu | Electro_593</title>
</svelte:head>

<header class="anchor">
	<h1 class="title">
		Electro_593: <span title="Darn it! I just lost the game.">The Game</span>
	</h1>
	<p>Portfolio Edition!</p>
</header>

<nav class="anchor">
	<ul>
		<!-- TODO: Could have a lightning buzz animation on hover, and a zap on active -->
		<li class="bubble">
			<a href={resolve("/new-game")} title="Projects">New Game</a>
		</li>
		<li class="bubble">
			<a href={resolve("/load-save")} title="Projects">Load Save</a>
		</li>
		<li class="bubble">
			<a href={resolve("/dlc")} title="Non-Software Work">DLC</a>
		</li>
		<li class="bubble">
			<a href={resolve("/credits")} title="About & Contact">Credits</a>
		</li>
		<!-- TODO: Could make this a funny "are you sure?" popup since I can't actually close their tab -->
		<li class="bubble"><button title="See you later!">Quit</button></li>
	</ul>
</nav>

<aside class="anchor bubble">
	<h2 title="Blog">Changelog</h2>
	<article>
		<h3>Version 1.0.0+2026-11-13</h3>
		<p>This just in: I have a website!</p>
	</article>
</aside>

<style>
	header {
		margin: 2em auto auto;
		text-align: right;

		& > h1 {
			font-size: 6em;
		}

		& > p {
			display: inline-block;
			margin-top: 0.5em;
			font-size: 2em;
			color: #d4e851;
			transform: rotate(-7deg);
		}
	}

	nav {
		margin: auto auto 8em 8em;

		& > ul {
			display: flex;
			flex-direction: column;
			gap: 1.5em;
			text-align: center;
			list-style: none;

			& > li {
				& > a {
					display: block;
					width: 100%;
					height: 100%;
					font-size: 2.75em;
				}

				& > button {
					display: block;
					width: 100%;
					height: 100%;
					font-size: 2.75em;
				}
			}
		}
	}

	aside {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		width: 25%;
		height: 40%;
		margin: auto 8em 8em auto;
	}
</style>

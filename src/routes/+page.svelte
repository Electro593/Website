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

<main>
	<nav>
		<ul>
			<li class="bubble">
				<a href={resolve("/new-game")} title="Requests & Contracting"
					>New Game</a
				>
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
			<li class="bubble"><button title="For squares">What is this?</button></li>
		</ul>
	</nav>

	<section class="bubble">
		<h2>Welcome to my portfolio!</h2>
		<p>
			As you can see, this website is designed to imitate a video game's menu
			UI. It may not be entirely intuitive which links navigate to what; you can
			hover over them to see tooltips of their actual content. But you don't
			have to!
		</p>

		<h3>TL;DR</h3>
		<ul>
			<li>
				Go to <a href={resolve("/new-game")}>New Game</a> to make requests.
			</li>
			<li>
				Go to <a href={resolve("/load-save")}>Load Save</a> to see my work.
			</li>
			<li>
				Go to <a href={resolve("/dlc")}>DLC</a> to see my non-software work.
			</li>
			<li>
				Go to <a href={resolve("/credits")}>Credits</a> to see details about me.
			</li>
			<li>
				Go to <a href={resolve("/changelog")}>Changelog</a> to see my blog.
			</li>
		</ul>

		<h3>Fun Stuff</h3>
		<p>
			You can refresh or click the bottom-left to see a variety of different
			backgrounds! See which one is your favorite-- mine is "Fireflies", though
			they're all very cool!
		</p>
	</section>

	<aside class="bubble">
		<h2 title="Blog">Changelog</h2>
		<article>
			<h3>Version 1.0.0+2026-11-13</h3>
			<p>This just in: I have a website!</p>
		</article>
	</aside>
</main>

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
			color: var(--color-yellow);
			transform: rotate(-7deg);
		}
	}

	main {
		display: flex;
		gap: 4em;
		margin: 16em 4em 2em;

		& > nav {
			flex: 1;

			& > ul {
				display: flex;
				flex-direction: column;
				gap: 1.5em;
				text-align: center;
				list-style: none;

				& > li {
					& > * {
						display: block;
						width: 100%;
						height: 100%;
						font-size: 2.75em;
					}

					&:last-child {
						margin-top: 2em;
						color: var(--color-highlight);
					}
				}
			}
		}

		& > section {
			display: flex;
			flex: 1.7;
			flex-direction: column;
			gap: 1em;
			line-height: 1.5;

			& > ul {
				list-style: none;
			}
		}

		& > aside {
			display: flex;
			flex: 1.3;
			flex-direction: column;
			gap: 0.5em;
		}
	}
</style>

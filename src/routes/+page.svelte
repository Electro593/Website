<script lang="ts">
	import { Button } from "#lib";
	import { getLocalValue, setLocalValue } from "#lib/services/storage.ts";
	import { resolve } from "$app/paths";

	let showHelp = $state(
		typeof window === "undefined" ? false : getLocalValue("show-help", true),
	);

	const handleClickHelp = () => {
		showHelp = !showHelp;
		setLocalValue("show-help", showHelp);
	};
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
			<li>
				<Button
					element="a"
					href={resolve("/new-game")}
					title="Guides & Tutorials">New Game</Button
				>
			</li>
			<li>
				<Button element="a" href={resolve("/load-save")} title="Projects"
					>Load Save</Button
				>
			</li>
			<li>
				<Button element="a" href={resolve("/extras")} title="Non-Software Work"
					>Extras</Button
				>
			</li>
			<li>
				<Button element="a" href={resolve("/credits")} title="About & Contact"
					>Credits</Button
				>
			</li>
			<li>
				<Button
					active={showHelp}
					element="button"
					onclick={handleClickHelp}
					title="How to Navigate">What is this?</Button
				>
			</li>
		</ul>
	</nav>

	{#if showHelp}
		<section class="bubble">
			<h2>Welcome to my portfolio!</h2>
			<p>
				As you can see, this website is designed to imitate a video game's menu
				UI. It may not be entirely intuitive which links navigate to what; you
				can hover over them to see tooltips of their actual content. But you
				don't have to!
			</p>

			<h3>TL;DR</h3>
			<ul>
				<li>
					Go to <a draggable="false" href={resolve("/new-game")}>New Game</a> to make
					requests.
				</li>
				<li>
					Go to <a draggable="false" href={resolve("/load-save")}>Load Save</a> to
					see my work.
				</li>
				<li>
					Go to <a draggable="false" href={resolve("/extras")}>Extras</a> to see my
					non-software work.
				</li>
				<li>
					Go to <a draggable="false" href={resolve("/credits")}>Credits</a> to see
					details about me.
				</li>
				<li>
					Go to <a draggable="false" href={resolve("/changelog")}>Changelog</a> to
					see my blog.
				</li>
			</ul>

			<h3>Fun Stuff</h3>
			<p>
				You can refresh or click the bottom-left to see a variety of different
				backgrounds! See which one is your favorite-- mine is "Fireflies",
				though they're all very cool!
			</p>
		</section>
	{/if}

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
			margin: 0;
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
		justify-content: space-between;
		margin: 16em 4em 2em;

		& > nav {
			width: 21em;

			& > ul {
				display: flex;
				flex-direction: column;
				gap: 1.5em;
				padding: 0;
				text-align: center;
				list-style: none;

				& > li {
					&:last-child {
						margin-top: 2em;
						color: var(--color-highlight);
					}
				}
			}
		}

		& > section {
			width: 32em;
			line-height: 1.5;

			& > ul {
				padding: 0;
				list-style: none;
			}
		}

		& > aside {
			width: 27em;
		}
	}
</style>

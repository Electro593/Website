<script lang="ts" module>
</script>

<script lang="ts">
	import { Button } from "#lib";
	import portrait from "#lib/assets/portrait.webp";
	import { getSessionValue, setSessionValue } from "#lib/services/storage.ts";
	import { resolve } from "$app/paths";

	let autoScroll = $state(getSessionValue("auto-scroll", true));
	let lastTime = 0;
	let main: HTMLElement;

	const handleScroll = () => {
		if (autoScroll) {
			autoScroll = false;
			setSessionValue("auto-scroll", false);
		}
	};

	$effect(() => {
		const scroll = (timestamp: number) => {
			if (!autoScroll) return;

			let deltaTime = timestamp - (lastTime || timestamp) * 0.0001;
			if (deltaTime > 0.1) deltaTime = 0.1;
			lastTime = timestamp;

			main.scrollBy({ behavior: "smooth", top: deltaTime * 5 });
			animationFrame = requestAnimationFrame(scroll);
		};

		let animationFrame = requestAnimationFrame(scroll);

		return () => {
			cancelAnimationFrame(animationFrame);
		};
	});
</script>

<svelte:head>
	<title>Credits | Electro_593</title>
</svelte:head>

<main bind:this={main} class="anchor bubble" onwheel={handleScroll}>
	<h1 class="heading">Credits</h1>

	<h2 class="heading">Team</h2>
	<address>
		<ul class="selectable">
			<li>
				<span class="heading">Lead Developer<span>:</span></span>
				<span>Aria Seiler (Electro_593)</span>
			</li>
			<li>
				<span class="heading">Player Support<span>:</span></span>
				<a draggable="false" href="mailto:contact@electro593.dev"
					>contact@electro593.dev</a
				>
			</li>
			<li>
				<span class="heading">Marketing & Outreach<span>:</span></span>
				<a
					draggable="false"
					href="https://www.linkedin.com/in/aria-seiler/"
					target="_blank">linkedin.com/in/aria-seiler</a
				>
			</li>
			<li>
				<span class="heading">Engine & Infrastructure<span>:</span></span>
				<a
					draggable="false"
					href="https://github.com/Electro593"
					target="_blank">github.com/Electro593</a
				>
			</li>
			<li>
				<span class="heading">Publisher<span>:</span></span>
				<a draggable="false" href="https://electro593.dev" target="_blank"
					>electro593.dev</a
				>
			</li>
		</ul>
	</address>

	<figure>
		<enhanced:img
			alt="Me"
			class="img"
			decoding="sync"
			draggable="false"
			src={portrait}
		/>
	</figure>

	<section class="introduction">
		<h2 class="heading">To the Community</h2>
		<p>
			Hello! I'm Aria Seiler, or Electro_593 online. I like making software by
			hand (even still, in the age of AI!). Taking inspiration from renowned
			coders such as Sean Barrett and the developers of SQLite, most of my work
			is dedicated to the public domain. Do with it what you wish!
		</p>
	</section>
</main>

<footer class="anchor">
	<nav>
		<Button element="a" href={resolve("/")} title="Home">Main Menu</Button>
	</nav>
</footer>

<style>
	@property --top-fade {
		syntax: "<color>";
		inherits: false;
		initial-value: #000;
	}

	@property --bottom-fade {
		syntax: "<color>";
		inherits: false;
		initial-value: #000;
	}

	.heading {
		color: #aaa;
		text-transform: uppercase;
	}

	main {
		width: auto;
		height: auto;
		padding: 2em;
		margin: 2em 30em 8em;
		overflow-y: scroll;
		text-align: center;
		background-color: color-mix(in srgb, black 40%, transparent);
		mask-image: linear-gradient(
			to bottom,
			var(--top-fade) 0,
			rgb(0 0 0 / 100%) 4em,
			rgb(0 0 0 / 100%) calc(100% - 4em),
			var(--bottom-fade) 100%
		);
		mask-clip: padding-box;
		mask-origin: padding-box;
		animation: scroll-vignette linear both;
		animation-timeline: scroll(self y);

		& > address > ul {
			display: flex;
			flex-flow: column wrap;
			gap: 2em;
			height: 100%;
			padding: 0;
			list-style: none;

			& > li {
				display: block;

				& > *:first-child {
					display: block;
					margin-bottom: 0.25em;

					& > span {
						display: none;
					}
				}

				& > *:last-child {
					font-style: normal;
				}
			}
		}

		& > figure > .img {
			height: 16em;
			border: 0.25em solid rgb(105 105 81);
			border-radius: 0.5em;
		}

		& > .introduction {
			& > h2 {
				margin-bottom: 0.5em;
			}
		}
	}

	footer {
		margin: auto auto 2em;
	}

	@keyframes scroll-vignette {
		0% {
			--top-fade: #000;
			--bottom-fade: transparent;
		}

		10%,
		90% {
			--top-fade: transparent;
			--bottom-fade: transparent;
		}

		100% {
			--top-fade: transparent;
			--bottom-fade: #000;
		}
	}
</style>

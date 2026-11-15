<script>
	import portrait from "#lib/assets/portrait.webp";
	import { resolve } from "$app/paths";
</script>

<svelte:head>
	<title>Credits | Electro_593</title>
</svelte:head>

<header class="anchor">
	<h1 class="title">Credits</h1>
</header>

<main class="anchor bubble">
	<div class="overview">
		<address>
			<ul class="selectable">
				<li>
					<span class="heading">Lead Developer<span>:</span></span>
					<span>Aria Seiler (Electro_593)</span>
				</li>
				<li>
					<span class="heading">Player Support<span>:</span></span>
					<a href="mailto:electro5939@gmail.com">electro5939@gmail.com</a>
				</li>
				<li>
					<span class="heading">Marketing & Outreach<span>:</span></span>
					<a href="https://www.linkedin.com/in/aria-seiler/" target="_blank"
						>linkedin.com/in/aria-seiler</a
					>
				</li>
				<li>
					<span class="heading">Engine & Infrastructure<span>:</span></span>
					<a href="https://github.com/Electro593" target="_blank"
						>github.com/Electro593</a
					>
				</li>
				<li>
					<span class="heading">Publisher<span>:</span></span>
					<a href="https://electro593.dev" target="_blank">electro593.dev</a>
				</li>
			</ul>
		</address>

		<figure>
			<enhanced:img alt="Me" class="img" decoding="sync" src={portrait} />
		</figure>
	</div>

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
	<nav class="bubble">
		<a href={resolve("/")}>Main Menu</a>
	</nav>
</footer>

<style>
	header {
		margin: 2em auto auto;

		& > h1 {
			font-size: 4em;
		}
	}

	.heading {
		color: #aaa;
		text-transform: uppercase;
	}

	main {
		inset: 8em;
		display: flex;
		flex-direction: column;
		gap: 4em;
		width: auto;
		height: auto;
		text-align: center;

		& > .overview {
			display: flex;
			height: 13em;
			margin: 2em;

			& > address {
				flex: 2;

				& > ul {
					display: flex;
					flex-flow: column wrap;
					gap: 2em;
					height: 100%;
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
			}

			& > figure {
				flex: 1;

				& > .img {
					height: 100%;
				}
			}
		}

		& > .introduction {
			& > h2 {
				margin-bottom: 0.5em;
			}

			& > p {
				padding: 0 8em;
			}
		}
	}

	footer {
		margin: auto auto 2em;

		& > nav {
			& > a {
				font-size: 2.75em;
			}
		}
	}
</style>

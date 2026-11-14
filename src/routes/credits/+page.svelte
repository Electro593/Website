<script>
	import portrait from "#lib/assets/portrait.webp";
	import { resolve } from "$app/paths";
</script>

<main class="anchor bubble">
	<h1>Credits</h1>

	<div class="overview">
		<address>
			<ul>
				<li>
					<p>Lead Developer</p>
					<p>Aria Seiler (Electro_593)</p>
				</li>
				<li>
					<p>Marketing & Outreach</p>
					<a href="https://www.linkedin.com/in/aria-seiler/"
						>https://www.linkedin.com/in/aria-seiler/</a
					>
				</li>
				<li>
					<p>Player Support</p>
					<a href="mailto:electro5939@gmail.com">mailto:electro5939@gmail.com</a
					>
				</li>
				<li>
					<p>Engine & Infrastructure</p>
					<a href="https://github.com/Electro593"
						>https://github.com/Electro593</a
					>
				</li>
				<li>
					<p>Publisher</p>
					<a href="https://www.electro593.dev">https://www.electro593.dev</a>
				</li>
			</ul>
		</address>

		<figure>
			<enhanced:img alt="Me" decoding="sync" src={portrait} />
		</figure>
	</div>

	<section>
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
	main {
		inset: 2em 8em 8em;
		display: flex;
		flex-direction: column;
		gap: 2em;
		width: auto;
		height: auto;

		& > h1 {
			font-size: 4em;
			text-align: center;
		}

		.overview {
			display: flex;
			height: 10em;
			margin: 0 2em;

			& > address {
				flex: 2;

				& > ul {
					display: flex;
					flex-flow: column wrap;
					gap: 1em;
					text-align: center;
					user-select: text;
					list-style: none;

					& > li {
						display: block;
					}
				}
			}

			& > figure {
				flex: 1;

				& > img {
					height: 10em;
				}
			}
		}
	}

	footer {
		margin: auto auto 2em;

		& > nav > a {
			font-size: 2.75em;
		}
	}
</style>

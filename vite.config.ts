import adapter from "@sveltejs/adapter-static";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { sveltekit } from "@sveltejs/kit/vite";
import { svelteSitemap } from "svelte-sitemap";
import { defineConfig } from "vite";

const disableCss = () => ({
	name: "disable-css",
	enforce: "pre",
	load(id) {
		if (id.includes(".css")) return "";
	},
});

export default defineConfig({
	plugins: [
		// disableCss(),
		enhancedImages(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes("node_modules") ? undefined : true,
			},

			adapter: adapter(),
		}),
		svelteSitemap({ domain: "https://electro593.dev" }),
	],
});

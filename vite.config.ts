import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
	resolve: {
		alias: {
			"~": resolve(__dirname, "./src"),
		},
	},
	plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
});

import { Router } from "./Router";
import "./main.module.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

function start() {
	const root = document.getElementById("root");
	if (!root) return null;

	createRoot(root).render(
		<StrictMode>
			<Router />
		</StrictMode>,
	);
}

start();

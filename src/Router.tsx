import { HomePage } from "./components/HomePage";
import { BrowserRouter, Route } from "react-router-dom";

export function Router() {
	return (
		<BrowserRouter>
			<Route path="/" element={<HomePage />}></Route>
			<Route path="/singleplayer" element={<HomePage />}></Route>
			<Route path="/multiplayer" element={<HomePage />}></Route>
			<Route path="/changelog" element={<HomePage />}></Route>
			<Route path="/options" element={<HomePage />}></Route>
			<Route path="/credits" element={<HomePage />}></Route>
		</BrowserRouter>
	);
}

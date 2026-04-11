import { HomePage } from "./components/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />}></Route>
				<Route path="/singleplayer" element={<HomePage />}></Route>
				<Route path="/multiplayer" element={<HomePage />}></Route>
				<Route path="/changelog" element={<HomePage />}></Route>
				<Route path="/options" element={<HomePage />}></Route>
				<Route path="/credits" element={<HomePage />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

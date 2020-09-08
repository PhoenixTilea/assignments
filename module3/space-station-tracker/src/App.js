import React from "react";
import Tracker from "./tracker/Tracker";
import "./App.css";

export default function App() {
	return (
		<div className="app">
			<header>
				<h1>International Space Station Tracker</h1>
			</header>
			<main>
				<Tracker />
			</main>
			<footer>
			
			</footer>
		</div>
	);
}
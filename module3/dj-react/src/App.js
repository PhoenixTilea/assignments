import React from "react";
import Board from "./board/Board";
import "./App.css";

export default function App() {
	return (
		<div className="app">
			<header>
				<h1>DJ React</h1>
			</header>
			<main>
				<Board />
			</main>
		</div>
	);
}
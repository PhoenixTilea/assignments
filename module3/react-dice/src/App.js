import React from "react";
import DiceBox from "./dice/DiceBox";
import "./App.css";

export default function App() {
	return (
		<div className="app">
			<header>
				<h1>React Dice</h1>
			</header>
			<main>
				<DiceBox />
			</main>
		</div>
	);
}
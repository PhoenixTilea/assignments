import React from "react";
import NameEntry from "./NameEntry";
import "./App.css";

export default function App() {
	return (
		<div className="app">
			<header>
				<h1>Name Entry</h1>
			</header>
			<main>
				<NameEntry />
			</main>
		</div>
	);
}
import React from "react";
import { Consumer } from "./ThemeContext";
import ThemeSelect from "./ThemeSelect";
import "./Main.css";

export default function Main() {
	return (
		<Consumer>
		{context => (
			<main className={`${context.theme}-theme`}>
				<p>Choose a theme below.</p>
				<ThemeSelect />
			</main>
		)}
		</Consumer>
	);
}
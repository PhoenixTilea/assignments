import React from "react";
import { Consumer } from "./ThemeContext";
import ThemeSelect from "./ThemeSelect";

export default function Header() {
	return (
		<Consumer>
		{context => (
			<header className={`${context.theme}-theme`}>
				<h1>{`${context.theme[0].toUpperCase()}${context.theme.slice(1)} Theme`}</h1>
			</header>
		)}
		</Consumer>
	);
}
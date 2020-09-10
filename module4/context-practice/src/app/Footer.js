import React from "react";
import { Consumer } from "./ThemeContext";
import "./Footer.css";

export default function Footer() {
	return (
		<Consumer>
		{context => (
			<footer className={`${context.theme}-theme`}>
				<p>Copyright whenever by whatever</p>
			</footer>
		)}
	</Consumer>
	);
}
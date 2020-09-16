import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import "./Footer.css";

export default function Footer() {
	const { theme } = useContext(ThemeContext);
	
	return (
		<footer className={`${theme}-theme`}>
		
		</footer>
	);
}
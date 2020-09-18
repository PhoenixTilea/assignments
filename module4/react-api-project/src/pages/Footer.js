import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import "./Footer.css";

export default function Footer() {
	const { theme } = useContext(ThemeContext);
	
	return (
		<footer className={`${theme}-theme`}>
			<h3>Copyright &copy; 2020 by Sabelyn Thorpe</h3>
			<p>
				Powered by 
				<a href="http://reactjs.org" target="_new">React</a> 
				and 
				<a href="https://thecatapi.com" target="_new">TheCatAPI</a>.
			</p>
		</footer>
	);
}
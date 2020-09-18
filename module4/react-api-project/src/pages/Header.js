import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import UserArea from "../components/UserArea";
import ThemeForm from "../components/ThemeForm";
import "./Header.css";

export default function Header() {
	const { theme } = useContext(ThemeContext);
	
	return (
		<header className={`${theme}-theme`}>
			<h1>Remote Cat Therapy</h1>
			<h3>Because kitties make even 2020 better!</h3>
			<nav>
				<Link to="/">Home</Link>
				<Link to="/all">All Images</Link>
				<Link to="/favs">Favorites</Link>
			</nav>
			<UserArea />
			<ThemeForm />
		</header>
	);
}
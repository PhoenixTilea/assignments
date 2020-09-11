import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import Home from "./site/Home";
import Services from "./site/Services";
import Contact from "./site/Contact";
import "./App.css";

export default function App() {
	return (
		<div className="app">
		<header>
			<h1>Crap Chute Plumbing</h1>
			<h3><em>We keep your shit working</em></h3>
			<nav>
				<Link to="/">Home</Link>
				<Link to="/services">Services</Link>
				<Link to="/contact">Contact Us</Link>
			</nav>
		</header>
		
		<main>
			<Switch>
				<Route exact path="/"><Home /></Route>
				<Route exact path="/services"><Services /></Route>
				<Route exact path="/contact"><Contact /></Route>
			</Switch>
		</main>
		
		<footer>
			<strong>Copyright &copy; 2020, Crap Chute Plumbing LLC. All rights reserved</strong>
		</footer>
		</div>
	);
}
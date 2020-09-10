import React from "react";
import Header from "./app/Header";
import Main from "./app/Main";
import Footer from "./app/Footer";
import "./App.css";

export default function App() {
	return (
		<div className="app">
			<Header />
			<Main />
			<Footer />
		</div>
	);
}
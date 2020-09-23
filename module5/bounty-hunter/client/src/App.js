import React, { useState } from "react";
import BountyList from "./components/BountyList";
import { BountyContextProvider } from "./components/BountyContext";
import "./App.css";

export default function App() {
	return (
		<BountyContextProvider><div id="app">
			<header>
				<h1>Original Bounty Hunter</h1>
			</header>
			<main>
				<BountyList />
			</main>
		</div></BountyContextProvider>
	);
}
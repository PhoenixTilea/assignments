import React, { useState } from "react";
import BountyList from "./components/BountyList";
import BountyForm from "./components/BountyForm";
import { BountyContextProvider } from "./components/BountyContext";
import "./App.css";

export default function App() {
	const [editing, setEditing] = useState({});
	
	const editBounty = (b) => {
		setEditing(b);
	};
	
	const clearEditing = () => setEditing({});
	
	return (
		<BountyContextProvider><div id="app">
			<header>
				<h1>Original Bounty Hunter</h1>
			</header>
			<main>
				<h2>Bounties</h2>
				<BountyList edit={editBounty} />
				<h2>{editing.length > 0 ? "Edit Bounty" : "Add Bounty"}</h2>
				<BountyForm clear={clearEditing} {...editing} submitText={editing.length > 0 ? "Save" : "Add"} />
			</main>
		</div></BountyContextProvider>
	);
}
import React from "react";
import { Nav } from "react-router-dom";

export default function DashboardNav() {
	return (
		<nav id="dashboard-nav">
			<Nav to="/dashboard" activeClassName="active">Overview</Nav>
			<Nav to="/dashboard/campaigns" activeClassName="active">Campaigns</Nav>
			<Nav to="/dashboard/characters" activeClassName="active">Characters</Nav>
			<Nav to="/dashboard/monsters" activeClassName="active">Monsters</Nav>
		</nav>
	);
}
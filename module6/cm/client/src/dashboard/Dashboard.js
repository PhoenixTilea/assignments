import React from "react";
import { Route, Switch} from "react-router-dom";
import DashboardNav from "./components/DashboardNav";

import OverviewPage from "./OverviewPage";
import CampaignPage from "./CampaignPage";
import CharacterPage from "./CharacterPage";
import MonsterPage from "./MonsterPage";
import MonTypePage from "./MonTypePage";

export default function Dashboard() {
	return (
		<main id="dashboard">
			<h1>Dashboard</h1>
			<DashboardNav />
			<Switch>
				<Route exact path="/dashboard"><OverviewPage /></Route>
				<Route exact path="/dashboard/campaigns"><CampaignsPage /></Route>
				<Route exact path="/dashboard/characters"><CharacterPage /></Route>
				<Route exact path="/dashboard/monsters"><Monsters /></Route>
				<Route exact path="/dashboard/montypes"><MonTypesPage /></Route>
			</Switch>
		</main>
	);
}
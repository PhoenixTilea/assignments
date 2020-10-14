import React from "react";
import { Route, Switch } from "react-router-dom";
import { AccContextProvider } from "../context/AccContext";
import OverviewPage from "./OverviewPage";
import AccountPage from "./AccountPage";

export default function Dashboard() {
	return (
		<AccContextProvider>
		<Switch>
			<Route exact path="/dashboard/account/:accId"><AccountPage /></Route>
			<Route path="/dashboard"><OverviewPage /></Route>
		</Switch>
		</AccContextProvider>
	);
}
import React from "react";
import { Route, Switch } from "react-router-dom";
import { AccContextProvider } from "../context/AccContext";
import { IEProvider } from "../context/IEContext";
import { ModalProvider } from "../context/ModalDisplayContext";
import OverviewPage from "./OverviewPage";
import AccountPage from "./AccountPage";

export default function Dashboard() {
	return (
		<AccContextProvider><IEProvider><ModalProvider>
		<Switch>
			<Route path="/dashboard/account/:accId"><AccountPage /></Route>
			<Route path="/dashboard"><OverviewPage /></Route>
		</Switch>
		</ModalProvider></IEProvider></AccContextProvider>
	);
}
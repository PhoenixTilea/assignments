import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import SiteNav from "./components/SiteNav";
import UserContext from "./context/UserContext";

import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";

export default function App() {
	const { token, logout } = useContext(UserContext);
	
	return (
		<>
		<header>
			<h1>QuickBudget</h1>
		</header>
		<SiteNav token={token} logout={logout} />
		<Switch>
			<Route exact path="/signup"><AuthPage create={true} /></Route>
			<ProtectedRoute token={token} path="/dashboard" redirect="/login"><Dashboard /></ProtectedRoute>
			<Route path="/"><AuthPage /></Route>
		</Switch>
		</>
	);
}
import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";

import UserContext from "./context/UserContext";

import SiteNav from "./components/SiteNav";
import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import UserApp from "./UserApp";

export default function App() {
	const { token, logout } = useContext(UserContext);
	
	return (
		<>
			<header>
				
				<SiteNav logout={logout} token={token} />
			</header>
			<Switch>
				<Route exact path="/"><HomePage /></Route>
				<Route exact path="/signup"><AuthPage create={true} /></Route>
				<Route exact path="/login"><AuthPage /></Route>
				<ProtectedRoute token={token} path="/dashboard" redirect="/"><UserApp /></ProtectedRoute>
			</Switch>
		</>
	);
}
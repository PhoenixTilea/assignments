import React, { useContext} from "react";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import AddIssue from "./pages/AddIssue";
import UserIssues from "./pages/UserIssues";
import AuthPage from "./pages/AuthPage";
import { UserContext } from "./context/UserContext";

export default function App() {
	const { token } = useContext(UserContext);
	
	return (
		<div id="app">
			<header>
				<h1>Rock the Vote</h1>
				<Nav />
			</header>
			<main>
				<Switch>
					<Route exact path="/"><Home /></Route>
					<ProtectedRoute exact={true} path="/new-issue" token={token} redirect="/" Component={AddIssue} />
					<ProtectedRoute exact={true} path="/profile" token={token} redirect="/" Component={UserIssues} />
					<Route exact path="/signup"><AuthPage signup={true} /></Route>
					<Route exact path="/login"><AuthPage /></Route>
				</Switch>
			</main>
		</div>
	);
}
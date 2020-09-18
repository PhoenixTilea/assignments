import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { FavContextProvider } from "../contexts/FavContext";
import Home from "./Home";
import AllImages from "./AllImages";
import Favorites from "./Favorites";
import { ThemeContext } from "../contexts/ThemeContext";
import "./Main.css";

export default function Main() {
	const { theme } = useContext(ThemeContext);
	
	return (
		<FavContextProvider><main className={`${theme}-theme`}>
			<Switch>
				<Route exact path="/"><Home /></Route>
				<Route exact path="/all"><AllImages /></Route>
				<Route exact path="/favs"><Favorites /></Route>
			</Switch>
		</main></FavContextProvider>
	);
}
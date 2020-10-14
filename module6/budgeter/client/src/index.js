import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";
import App from "./App.js";
import "./index.css";

ReactDom.render(
	<Router>
		<UserContextProvider>
			<App />
		</UserContextProvider>
	</Router>,
	document.getElementById("root")
);
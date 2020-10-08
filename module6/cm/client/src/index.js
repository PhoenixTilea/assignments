import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { UsercontextProvider } from "./context/UserContext";
import App from "./App.js";

ReactDom.render(
	<BrowserRouter>
		<UserContextProvider>
			<App />
		</UserContextProvider>
	</BrowserRouter>,
	document.getElementById("root")
);
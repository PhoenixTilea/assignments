import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter} from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";
import { IssueContextProvider } from "./context/IssueContext";
import App from "./App";

ReactDom.render(
	<BrowserRouter>
		<UserContextProvider>
			<IssueContextProvider>
				<App />
			</IssueContextProvider>
		</UserContextProvider>
	</BrowserRouter>,
	document.getElementById("root")
);
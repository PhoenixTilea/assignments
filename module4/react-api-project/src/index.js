import React from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

Axios.defaults.headers.common["x-api-key"] = "93409a3b-7980-4ecc-b52f-510e3d6d7281";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
		<App />
	</BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();

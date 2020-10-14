import React from "react";
import {Route, Redirect} from "react-router-dom";

export default function ProtectedRoute(props) {
	const {path, exact, redirect, token, children } = props;
	
	return (
		<>
		{(token) ? <Route exact={exact} path={path}>{children}</Route>
			: <Redirect to={redirect} />
		}
		</>
	);
}
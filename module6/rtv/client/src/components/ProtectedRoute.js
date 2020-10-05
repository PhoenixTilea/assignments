import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute(props) {
	const { path, exact, redirectTo, token } = props;
	
	return (
	<>
	{(token) ? <Route exact={exact} path={path}>
		{props.children}
		</Route>
		: <Redirect path={redirectTo} />
	}
	</>
	);
}
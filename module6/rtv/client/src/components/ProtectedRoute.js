import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute(props) {
	const { path, exact, redirectTo, token, Component, ...rest} = props;
	
	return (
	<>
	{(token) ? <Route exact={exact} path={path}><Component {...rest} /></Route>
		: <Redirect path={redirectTo} />
	}
	</>
	);
}
import React from "react";
import { Nav } from "react-router-dom";

export default function SiteNav(props) {
	const { token, logout } = props;
	
	return (
		<nav id="site-nav">
			<Nav to="/" activeClassName="active">Home</Nav>
			{(token) ?
				<>
					<Nav to="/dashboard" activeClassName="active">My Dashboard</Nav>
					<button onClick={logout}>Logout</button>
				</>
				: <>
					<Nav to="login" activeClassName="active">Login</Nav>
					<Nav to="signup" activeClassName="active">Register</Nav>
				</>
			}
		</nav>
	);
}
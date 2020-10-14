import React from "react";
import { NavLink } from "react-router-dom";

export default function SiteNav(props) {
	const { token, logout } = props;
	
	return (
		<nav id="site-nav">
			{(token) ? <>
					<NavLink to="/dashboard">My Dashboard</NavLink>
					<button onClick={logout}>Log out</button>
				</>
				: <>
					<NavLink to="/signup">Register</NavLink>
					<NavLink to="/login">Login</NavLink>
				</>
			}
		</nav>
	);
}
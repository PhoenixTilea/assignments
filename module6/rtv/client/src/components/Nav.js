import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import UserRegion from "./UserRegion";

export default function Nav() {
	const { user, token, logout } = useContext(UserContext);
	
	return (
		<nav>
			<Link to="/">Home</Link>
			{(!token) ? <>
			<Link to="/signup">Register</Link>
			<Link to="/login">Login</Link>
			</> : <>
				<Link to="/new-issue">Post an Issue</Link>
				<Link to="/profile">My Issues</Link>
				<UserRegion name={user.username} logout={logout} />
			</>
			}
		</nav>
	);
}

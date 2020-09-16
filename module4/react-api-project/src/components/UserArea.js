import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import LoginForm from "./LoginForm";

export default function UserArea() {
	const { user, login, logout } = useContext(UserContext);
	
	return (
		<div className="user-area" role="region" roleDescription="user area">
		{user !== null ?
			<strong>{`Hi, ${user}`}</strong>
			<button onClick={logout}>Logout</button> 
			:
			<LoginForm login={login} />
		}
		</div>
	);
}
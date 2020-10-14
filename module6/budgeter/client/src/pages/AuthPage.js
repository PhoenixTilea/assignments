import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function AuthPage(props) {
	const {create} = props;
	const { token, authError, setAuthError, signup, login } = useContext(UserContext);
	const [fields, setFields] = useState({
		username: "",
		password: ""
	});
	const autofocus = useRef(null);
	
	useEffect(() => {
		autofocus.current.focus();
		setAuthError(null);
		// eslint-disable-next-line
	}, [create]);
	
	const handleChange = e => {
		const {name, value} = e.target;
		setFields(prevFields => ({...prevFields, [name] : value}));
	};
	
	const handleSubmit = e => {
		e.preventDefault();
		setAuthError(null);
		if (create) {
			signup(fields);
		} else {
			login(fields);
		}
	};
	
	return (
		<main id="auth-page">
			{(token) && <Redirect to="/dashboard" />}
		<h1>{(create) ? "Create an Account" : "Login to Your Account"}</h1>
		<form onSubmit={handleSubmit}>
			{(authError) && <p className="error" role="alert">{authError}</p>}
			<label>
				<strong>Username: </strong>
				<input type="text" name="username" value={fields.username} onChange={handleChange} ref={autofocus} required />
			</label>
			<label>
				<strong>Password: </strong>
				<input type="password" name="password" value={fields.password} onChange={handleChange} required />
			</label>
			<button>{(create) ? "Signup" : "Login"}</button>
		</form>
		<p>
			<span>{(create) ? "Already have an account?" : "Don't have an account?"}</span> 
			<Link to={(create) ? "/login" : "/signup"}>{(create) ? "Login instead" : "Create an account instead"}</Link>
		</p>
		</main>
	);
}
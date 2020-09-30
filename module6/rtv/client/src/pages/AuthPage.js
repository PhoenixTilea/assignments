import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { UserContext } from "../context/UserContext";

export default function AuthPage(props) {
	const { token, error, setError, signup, login } = useContext(UserContext);
	
	useEffect(() => {
		setError("");
	}, [props.signup]);
	
	return (
		<>
		{(token) && <Redirect path="/" />}
			<h1>{props.signup ? "Create Your Account" : "Log into your Account"}</h1>
				{error && <p className="error" role="alert">{error}</p>}
				{props.signup ? <AuthForm submit={signup} submitText="Sign Up" /> :
					<AuthForm submit={login} submitText="Login" />
				}
		</>
	);
}
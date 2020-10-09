import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import UserContext from "../context/UserContext";
import "./styles/AuthPage.css";

export default function AuthPage(props) {
	const { token, error, setError, signup, login } = useContext(UserContext);
	const { create } = props;
	const [fields, setFields] = useState({
		username: "",
		password: "",
		confirmPassword: ""
	});
	const [saveLogin, setSaveLogin] = useState(true);
	const [formError, setFormError] = useState(null);
	const firstField = useRef(null);
	const submitBtn = useRef(null);
	
	useEffect(() => {
		setError(null);
		firstField.current.focus();
		// eslint-disable-next-line
	}, []);
	
	useEffect(() => {
		setFormError(error);
		submitBtn.current.removeAttribute("disabled");
		// eslint-disable-next-line
	}, [error]);
	
	const handleChange = e => {
		const {name, value, checked} = e.target;
	if (name === "saveLogin") {
		setSaveLogin(checked);
	} else {
		setFields(prevFields => ({...prevFields, [name] : value}));
	}
	};
	
	const handleSubmit = e => {
		e.preventDefault();
		setFormError(null);
		submitBtn.current.setAttribute("disabled", true);
		
		const creds = {...fields};
		delete creds.confirmPassword;
		if (create) {
			signup(creds, saveLogin);
		} else {
			login(creds, saveLogin);
		}
	};
	
	return (
		<main id="auth-page">
		{(token) && <Redirect to="/dashboard" />}
		<h1>{(create) ? "Create an Account" : "Login to Your Account"}</h1>
		<form onSubmit={handleSubmit}>
			{(formError) && <p className="error" aria-live="polite">{formError}</p>}
			<label>
				<strong>Username: </strong>
				<input type="text" name="username" value={fields.username} onChange={handleChange} ref={firstField} required />
			</label>
			<label>
				<strong>Password: </strong>
				<input type="password" name="password" value={fields.password} onChange={handleChange} required />
			</label>
			{(create) && <label>
					<strong>Retype Password: </strong>
					<input type="password" name="confirmPassword" value={fields.confirmPassword} onChange={handleChange} required />
				</label>
			}
			<label>
				<input type="checkbox" name="saveLogin" checked={saveLogin} onChange={handleChange} />
				<span>Keep me logged in</span>
			</label>
			<button ref={submitBtn}>
				{(create) ? "Signup" : "Login"}
			</button>
			{(create) ? <p>
					Already have an account?
					<Link to="/login">Login instead</Link>
				</p>
				: <p>
					Don't have an account?
					<Link to="/signup">Create an account instead.</Link>
				</p>
		}
		</form>
		</main>
	);
}
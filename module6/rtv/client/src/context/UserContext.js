import React, { useState } from "react";
import axios from "axios";

const userAxios = axios.create();

export const UserContext = React.createContext();

export function UserContextProvider(props) {
	const [auth, setAuth] = useState({
		user: JSON.parse(localStorage.getItem("user") || "{}"),
		token: localStorage.getItem("token") || "",
		issues: []
	});
	const [error, setError] = useState("");
	
	userAxios.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${auth.token}`;
	return config;
});
	
	const signup = (creds) => {
		axios.post("/auth/signup", creds).then(response => {
			const { user, token } = response.data;
			setAuth({user, token});
			localStorage.setItem("user", JSON.stringify(user));
			localStorage.setItem("token", token);
		}).catch(err => {
			if (err.response) {
				setError(err.response.data.error);
			} else {
				console.error(err);
			}
		});
	};
	
	const login = (creds) => {
		axios.post("/auth/login", creds).then(response => {
			const { user, token } = response.data;
			setAuth(prevAuth => ({user, token}), getUserIssues);
			localStorage.setItem("user", JSON.stringify(user));
			localStorage.setItem("token", token);
		}).catch(err => {
			if (err.response) {
				setError(err.response.data.error);
			} else {
				console.error(err);
			}
		});
	};
	
	const logout = () => {
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		setAuth({user: {}, token: "", issues: []});
	};
	
	const getUserIssues = () => {
		userAxios.get("/protected/issues").then(response => {
			setAuth(prevAuth => ({...prevAuth, issues: response.data}));
		});
	};
	
	const addIssue = (issue) => {
		userAxios.post("/protected/issues", issue).then(response => {
			setAuth(prevAuth => ({...prevAuth, issues: [...prevAuth.issues, response.data]}));
		});
	};
	
const value = {...auth, error, setError, signup, login, logout, addIssue, getUserIssues};
	return (
		<UserContext.Provider value={value}>
			{props.children}
		</UserContext.Provider>
	);
}

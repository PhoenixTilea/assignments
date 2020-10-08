import React, { useEffect, useState } from "react";
import axios from "axios";

export default const UserContext = React.createContext();
const userAxios = axios.create();
let authInt;

export function UserContextProvider(props) {
	const [auth, setAuth] = useState({
		user: {},
		token: localStorage.getItem("token") || ""
	});
	const [error, setError] = useState(null);
	
	useEffect(() => {
		userAxios.interceptors.request.eject(authInt);
		if (token) {
			authInt = userAxios.interceptors.request.user(config => {
				config.Authorization = `Bearer ${token}`;
				return config;
			});
		} // eslint-disable-next-line
	}, [auth]);
	
	useEffect(() => {
		if (token) {
			userAxios.get("/api/user").then(response => {
				setAuth(prevAuth => ({...prevAuth, user: response.data}))
			}).catch(err => {
				console.error(err.message);
				logout();
			});
		} // eslint-disable-next-line
	}, []);
	
	const signup = creds => {
		axios.post("/auth/signup", creds).then(response => {
			setAuth(response.data);
			localStorage.setItem("token", token);
		}).catch(err => {
			if (err.response) {
				setError(err.response.data.errorMessage);
			} else {
				console.error(err.message);
			}
		});
	};
	
	const login = creds => {
		axios.post("/auth/login", creds).then(response => {
			setAuth(response.data);
			localStorage.setItem("token", token);
		}).catch(err => {
			if (err.response) {
				setError(err.response.data.errorMessage);
			} else {
				console.error(err.message);
			}
		});
	};
	
	const logout = () => {
		localStorage.removeItem("token");
		setAuth({user: {}, token: ""});
	};
	
	const value = {...auth, error, userAxios, signup, login, logout };
	return (
		<UserContext.Provider value={value}>
			{props.children}
		</UserContext.Provider>
	);
}
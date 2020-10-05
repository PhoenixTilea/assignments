import React, { useEffect, useState } from "react";
import axios from "axios";

const userAxios = axios.create();

export const UserContext = React.createContext();

export function UserContextProvider(props) {
	const [auth, setAuth] = useState({
		user: {},
		token: localStorage.getItem("token") || ""
	});
	const [error, setError] = useState("");
	
	useEffect(() => {
		if (auth.token) {
			updateUser();
		} // eslint-disable-next-line
	}, []);
	
	let authInt;
	useEffect(() => {
		axios.interceptors.request.eject(authInt);
		if (auth.token) {
			authInt = userAxios.interceptors.request.use((config) => {
				config.headers.Authorization = `Bearer ${auth.token}`;
				return config;
			});
		}
	}, [auth.token]);
	
	const updateUser = () => {
		userAxios.get("/protected/user").then(response => {
			setAuth(prevAuth => ({...prevAuth, user: response.data}));
		}).catch(err => console.error(err));
	};
	
	const signup = (creds) => {
		axios.post("/auth/signup", creds).then(response => {
			const { user, token } = response.data;
			setAuth({user, token});
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
			setAuth({user, token});
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
		localStorage.removeItem("token");
		setAuth({user: {}, token: ""});
	};
	
const value = {...auth, error, setError, signup, login, logout, userAxios, updateUser};
	return (
		<UserContext.Provider value={value}>
			{props.children}
		</UserContext.Provider>
	);
}

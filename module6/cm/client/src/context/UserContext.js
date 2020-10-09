import React, { useEffect, useState } from "react";
import axios from "axios";

const UserContext = React.createContext();
export default UserContext;
const userAxios = axios.create();
let authInt;

export function UserContextProvider(props) {
	const [auth, setAuth] = useState({
		user: {},
		token: localStorage.getItem("auth.token") || sessionStorage.getItem("auth.token") || ""
	});
	const [error, setError] = useState(null);
	
	useEffect(() => {
		userAxios.interceptors.request.eject(authInt);
		if (auth.token) {
			authInt = userAxios.interceptors.request.use(config => {
				config.Authorization = `Bearer ${auth.token}`;
				return config;
			});
		} // eslint-disable-next-line
	}, [auth]);
	
	useEffect(() => {
		if (auth.token) {
			userAxios.get("/api/user").then(response => {
				setAuth(prevAuth => ({...prevAuth, user: response.data}))
			}).catch(err => {
				console.error(err.message);
				logout();
			});
		} // eslint-disable-next-line
	}, []);
	
	const signup = (creds, save) => {
		axios.post("/auth/signup", creds).then(response => {
			setAuth(response.data);
			if (save) {
				localStorage.setItem("token", auth.token);
			} else {
				sessionStorage.setItem("token", auth.token);
			}
		}).catch(err => {
			if (err.response) {
				setError(err.response.data.error);
			} else {
				console.error(err.message);
			}
		});
	};
	
	const login = (creds, save) => {
		axios.post("/auth/login", creds).then(response => {
			setAuth(response.data);
			if (save) {
				localStorage.setItem("token", auth.token);
			} else {
				sessionStorage.setItem("token", auth.token);
			}
		}).catch(err => {
			if (err.response) {
				setError(err.response.data.error);
			} else {
				console.error(err.message);
			}
		});
	};
	
	const logout = () => {
		localStorage.removeItem("token");
		sessionStorage.removeItem("token");
		setAuth({user: {}, token: ""});
	};
	
	const value = {...auth, error, setError, userAxios, signup, login, logout };
	return (
		<UserContext.Provider value={value}>
			{props.children}
		</UserContext.Provider>
	);
}
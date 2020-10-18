import React, { useEffect, useState } from "react";
import axios from "axios";

const UserContext = React.createContext();
export default UserContext;

const userAxios = axios.create();
let authInt = userAxios.interceptors.request.use(config => {
	config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
	return config;
});

export function UserContextProvider(props) {
	const [auth, setAuth] = useState({
		user: {},
		token: localStorage.getItem("token") || ""
	});
	const [authError, setAuthError] = useState(null);
	
	useEffect(() => {
		if (auth.token) {
			userAxios.interceptors.request.eject(authInt);
			authInt = userAxios.interceptors.request.use(config => {
				config.headers.Authorization = `Bearer ${auth.token}`;
				return config;
			});
		} // eslint-disable-next-line
	}, [auth]);
	
	useEffect(() => {
		if (auth.token) {
			userAxios.get("/api/user").then(response => {
					setAuth(prevAuth => ({...prevAuth, user: response.data}))
			}).catch(err => {
					console.error(err);
					logout();
				});
		}
		// eslint-disable-next-line
	}, []);
	
	const signup = creds => {
		axios.post("/auth/signup", creds).then(response => {
			setAuth(response.data);
			localStorage.setItem("token", response.data.token);
		}).catch(err => {
			if (err.response) {
				setAuthError(err.response.data.error);
			} else {
				console.error(err);
			}
		});
	};
	
	const login = creds => {
		axios.post("/auth/login", creds).then(response => {
			setAuth(response.data);
			localStorage.setItem("token", response.data.token);
		}).catch(err => {
			if (err.response) {
				setAuthError(err.response.data.error);
			} else {
				console.error(err);
			}
		});
	};
	
	const logout = () => {
	setAuth({user: {}, token: ""});
		localStorage.removeItem("token");
	};
	
	const value = {...auth, userAxios, authError, setAuthError, signup, login, logout};
	return (
		<UserContext.Provider value={value}>
			{props.children}
		</UserContext.Provider>
	);
}
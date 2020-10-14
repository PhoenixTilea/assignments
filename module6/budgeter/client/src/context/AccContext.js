import React, { useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";

const AccContext = React.createContext();
export default AccContext;

export function AccContextProvider(props) {
	const { user, userAxios } = useContext(UserContext);
	const [accounts, setAccounts] = useState([]);
	
	useEffect(() => {
		if (user) {
			userAxios.get("/api/accounts").then(response => {
				setAccounts(response.data);
			}).catch(err => console.error(err));
		}
		// eslint-disable-next-line
	}, [user]);
	
	const addAccount = data => {
		userAxios.post("/api/accounts", data).then(response => {
			setAccounts(prevAccounts => [...prevAccounts, response.data]);
		}).catch(err => console.error(err));
	};
	
	const updateAccount = (id, data) => {
		userAxios.put(`/api/accounts/${id}`, data).then(response => {
			const index = accounts.findIndex(acc => acc._id === id);
			const updated = [...accounts];
			updated[index] = response.data;
			setAccounts(updated);
		}).catch(err => console.error(err));
	};
	
	const deleteAccount = id => {
		userAxios.delete(`/api/accounts/${id}`).then(response => {
			const updated = accounts.filter(acc => acc._id !== id);
			setAccounts(updated);
		}).catch(err => console.error(err));
	};
	
	const value = { accounts, addAccount, updateAccount, deleteAccount };
	return (
		<AccContext.Provider value={value}>
			{props.children}
		</AccContext.Provider>
	);
}
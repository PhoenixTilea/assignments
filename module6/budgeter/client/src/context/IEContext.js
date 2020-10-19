import React, { useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";

const IEContext = React.createContext();
export default IEContext;

export function IEProvider(props) {
	const { token, userAxios } = useContext(UserContext);
	const [incomes, setIncomes] = useState([]);
	const [expenses, setExpenses] = useState([]);
	
	useEffect(() => {
		if (token) {
			getIE();
		}
	}, [token]);
	
	const getIE = () => {
		userAxios.get("/api/expenses").then(response => {
			const inc = [];
			const exp = [];
			response.data.forEach(ex => {
				if (ex.amount < 0) {
					exp.push(ex);
				} else {
					inc.push(ex);
				}
			});
			setIncomes(inc);
			setExpenses(exp);
		}).catch(err => console.error(err));
	};
	
	const addIE = data => {
		userAxios.post("/api/expenses", data).then(response => {
			getIE();
		}).catch(err => console.error(err));
	};
	
	const updateIE = (id, data) => {
		userAxios.put(`/api/expenses/${id}`, data).then(response => {
			getIE();
		}).catch(err => console.error(err));
	};
	
	const deleteIE = id => {
		userAxios.delete(`/api/expenses/${id}`).then(response => {
			if (response.data.exp.amount > 0) {
				setIncomes(prevIncomes => prevIncomes.filter(inc => inc._id !== id));
			} else {
				setExpenses(prevExpenses => prevExpenses.filter(ex => ex._id !== id));
			}
		}).catch(err => console.error(err));
	};
	
	const value = { expenses, incomes, addIE, updateIE, deleteIE };
	return (
		<IEContext.Provider value={value}>
			{props.children}
		</IEContext.Provider>
	);
}
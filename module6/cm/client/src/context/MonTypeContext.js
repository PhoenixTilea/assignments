import React, { useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";

const MonTypeContext = React.createContext();
export default MonTypeContext;

export function MonTypeContextProvider(props) {
	const { userAxios } = useContext(UserContext);
	const [types, setTypes] = useState([]);
	
	useEffect(() => {
		userAxios.get("/api/montypes").then(response => {
			setTypes(response.data);
		}).catch(err => console.error(err));
		// eslint-disable-next-line
	}, []);
	
	const addMonType = type => {
		userAxios.post("/api/montypes", mon).then(response => {
			setTypes(prevTypes => [...prevTypes, response.data]);
		}).catch(err => console.error(err));
	};
	
	const updateMonType = (id, data) => {
		userAxios.put(`/api/montypes/${id}`, data).then(response => {
			const index = types.findIndex(mon => mon._id === id);
			const copy = [...types];
			copy[index] = response.data;
			setTypes(copy);
		}).catch(err => console.error(err));
	};
	
	const deleteMonType = id => {
		userAxios.delete(`/api/montypes/${id}`).then(response => {
			const index = types.findIndex(mon => mon._id === id);
			const copy = [...types];
			copy.splice(index, 1);
			setTypes(copy);
		}).catch(err => console.error(err));
	};
	
	const value = {types, addMonType, updateMonType, deleteMonType };
	return (
		<MonTypeContext.Provider value={value}>
			{props.children}
		</MonTypeContext.Provider>
	);
}
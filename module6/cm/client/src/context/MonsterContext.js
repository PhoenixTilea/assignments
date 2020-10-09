import React, { useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";

const MonsterContext = React.createContext();
export default MonsterContext;

export function MonsterContextProvider(props) {
	const { userAxios } = useContext(UserContext);
	const [mons, setMons] = useState([]);
	
	useEffect(() => {
		userAxios.get("/api/monsters").then(response => {
			setMons(response.data);
		}).catch(err => console.error(err));
		// eslint-disable-next-line
	}, []);
	
	const addMonster = mon => {
		userAxios.post("/api/monsters", mon).then(response => {
			setMons(prevMons => [...prevMons, response.data]);
		}).catch(err => console.error(err));
	};
	
	const updateMonster = (id, data) => {
		userAxios.put(`/api/monsters/${id}`, data).then(response => {
			const index = mons.findIndex(mon => mon._id === id);
			const copy = [...mons];
			copy[index] = response.data;
			setMons(copy);
		}).catch(err => console.error(err));
	};
	
	const deleteMonster = id => {
		userAxios.delete(`/api/monsters/${id}`).then(response => {
			const index = mons.findIndex(mon => mon._id === id);
			const copy = [...mons];
			copy.splice(index, 1);
			setMons(copy);
		}).catch(err => console.error(err));
	};
	
	const value = {mons, addMonster, updateMonster, deleteMonster };
	return (
		<MonsterContext.Provider value={value}>
			{props.children}
		</MonsterContext.Provider>
	);
}
import React, { useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";

const CharacterContext = React.createContext();
export default CharacterContext;

export function CharacterContextProvider(props) {
	const { userAxios } = useContext(UserContext);
	const [chars, setChars] = useState([]);
	
	useEffect(() => {
		userAxios.get("/api/characters").then(response => {
			setChars(response.data);
		}).catch(err => console.error(err));
		// eslint-disable-next-line
	}, []);
	
	const addCharacter = chr => {
		userAxios.post("/api/characters", chr).then(response => {
			setChars(prevChars => [...prevChars, response.data]);
		}).catch(err => console.error(err));
	};
	
	const updateCharacter = (id, data) => {
		userAxios.put(`/api/characters/${id}`, data).then(response => {
			const index = chars.findIndex(chr => chr._id === id);
			const copy = [...chars];
			copy[index] = response.data;
			setChars(copy);
		}).catch(err => console.error(err));
	};
	
	const deleteCharacter = id => {
		userAxios.delete(`/api/characters/${id}`).then(response => {
			const index = chars.findIndex(chr => chr._id === id);
			const copy = [...chars];
			copy.splice(index, 1);
			setChars(copy);
		}).catch(err => console.error(err));
	};
	
	const value = {chars, addCharacter, updateCharacter, deleteCharacter };
	return (
		<CharacterContext.Provider value={value}>
			{props.children}
		</CharacterContext.Provider>
	);
}
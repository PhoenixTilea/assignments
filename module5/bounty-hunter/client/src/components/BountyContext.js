import React, { useEffect, useState } from "react";
import axios from "axios";

const BountyContext = React.createContext();

function BountyContextProvider(props) {
	const [list, setList] = useState([]);
	
	useEffect(() => {
		axios.get("/bounties").then(res => setList(res.data))
			.catch(err => console.error(err));
	}, []);
	
	const add = (data) => {
		axios.post("/bounties", data).then(res => {
			const bounty = res.data.bounty;
			setList(prevList => [...prevList, bounty]);
		}).catch(err => console.error(err));
	};
	
	const update = (id, data) => {
		axios.put(`/bounties/${id}`, data).then(res => {
			const l = list.slice();
			const index = l.findIndex(b => b._id === id);
			const updated = res.data.bounty;
			l.splice(index, 1, updated);
			setList(l);
		}).catch(err => console.error(err));
	};
	
	const remove = (id) => {
		axios.delete(`/bounties/${id}`).then(res => {
			const l = list.slice().filter(b => b._id !== id);
			setList(l);
		}).catch(err => console.error(err));
	};
	
	return (
		<BountyContext.Provider value={{list, add, update, remove}}>
			{props.children}
		</BountyContext.Provider>
	);
}

export { BountyContext, BountyContextProvider };
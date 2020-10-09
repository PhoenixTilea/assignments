import React, { useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";

const CampaignContext = React.createContext();
export default CampaignContext;

export function CampaignContextProvider(props) {
	const { userAxios } = useContext(UserContext);
	const [cams, setCams] = useState([]);
	
	useEffect(() => {
		userAxios.get("/api/campaigns").then(response => {
			setCams(response.data);
		}).catch(err => console.error(err));
		// eslint-disable-next-line
	}, []);
	
	const addCampaign = cam => {
		userAxios.post("/api/campaigns", cam).then(response => {
			setCams(prevCams => [...prevCams, response.data]);
		}).catch(err => console.error(err));
	};
	
	const updateCampaign = (id, data) => {
		userAxios.put(`/api/campaigns/${id}`, data).then(response => {
			const index = cams.findIndex(cam => cam._id === id);
			const copy = [...cams];
			copy[index] = response.data;
			setCams(copy);
		}).catch(err => console.error(err));
	};
	
	const deleteCampaign = id => {
		userAxios.delete(`/api/campaigns/${id}`).then(response => {
			const index = cams.findIndex(cam => cam._id === id);
			const copy = [...cams];
			copy.splice(index, 1);
			setCams(copy);
		}).catch(err => console.error(err));
	};
	
	const value = {cams, addCampaign, updateCampaign, deleteCampaign };
	return (
		<CampaignContext.Provider value={value}>
			{props.children}
		</CampaignContext.Provider>
	);
}
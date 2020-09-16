import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import UserContext from "./UserContext";
import { baseUrl } from "../data.json";

const FavContext = React.createContext();

function FavContextProvider(props) {
	const [favs, setFavs] = useState({});
	const { user } = useContext(UserContext);
	
	useEffect(() => {
		if (user !== null) {
			getFavs();
		} else {
			setFavs({});
		}
	}, user);
	
	const getFavs = () => {
		const params = {sub_id: user};
		Axios.get(`${baseUrl}/favorites`, {params}).then(response => {
			const favsList = {};
			response.data.map(fav => favsList[fav.image_id] = fav.id);
			setFavs(favsList);
		});
	};
	
	const addFav = (imgId) => {
		const body = {image_id: imgId, sub_id: user };
		Axios.post(`${baseUrl}/favorites`, body).then(response => {
			const favId = response.data[0].id;
			setFavs(prevFavs => ({...prevFavs, [imgId] : favId }));
		});
	};
	
	const removeFav = (id) => {
		Axios.delete(`${baseUrl}/favorites/${id}`).then(() => {
			getFavs();
		});
	};
	
	return (
		<FavContext.Provider value={{favs: favs, add: addFav, remove: removeFav }}>
			{props.children}
		</FavContext.Provider>
	);
}

export { FavContext, FavContextProvider };
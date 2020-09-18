import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import { UserContext } from "./UserContext";
import { baseUrl } from "../data.json";

const FavContext = React.createContext();

function FavContextProvider(props) {
	const [favs, setFavs] = useState({});
	const { user } = useContext(UserContext);
	
	const getFavs = () => {
		const params = {sub_id: user};
		Axios.get(`${baseUrl}favourites`, {params}).then(response => {
			const favsList = {};
			response.data.map(fav => favsList[fav.image_id] = fav.id);
			setFavs(favsList);
		}).catch(err => console.log(err));
	};
	
	useEffect(() => {
		if (user) {
			getFavs();
		} else {
			setFavs({});
		} // eslint-disable-next-line
	}, [user]);
	
	const addFav = (imgId) => {
		const body = {image_id: imgId, sub_id: user };
		console.log(body);
		Axios.post(`${baseUrl}favourites`, body).then(response => {
			const favId = response.data.id;
			setFavs(prevFavs => ({...prevFavs, [imgId] : favId }));
		}).catch(err => console.log(err));
	};
	
	const removeFav = (id) => {
		Axios.delete(`${baseUrl}favourites/${id}`).then(() => {
			getFavs();
		}).catch(err => console.log(err));
	};
	
	return (
		<FavContext.Provider value={{favs: favs, add: addFav, remove: removeFav }}>
			{props.children}
		</FavContext.Provider>
	);
}

export { FavContext, FavContextProvider };
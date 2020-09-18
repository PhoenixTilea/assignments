import React, { useContext } from "react";
import { FavContext } from "../contexts/FavContext";
import { UserContext } from "../contexts/UserContext";
import "./FavButton.css";

export default function FavButton(props) {
	const {favs, add, remove } = useContext(FavContext);
	const { user } = useContext(UserContext);
	
	const handleClick = () => {
		if (favs[props.imgId]) {
			remove(favs[props.imgId]);
		} else {
			add(props.imgId);
		}
	};
	
	return (
		<button className="fav-button" onClick={handleClick} 
			disabled={user === null} 
			title={(user === null) ? "Login to favorite images" : undefined}
		>
			{favs[props.imgId] !== undefined ? "Unfavorite" : "Favorite"}
		</button>
	);
}
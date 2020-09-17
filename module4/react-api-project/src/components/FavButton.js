import React, { useContext, useEffect, useState } from "react";
import { FavContext } from "../contexts/FavContext";
import { UserContext } from "../contexts/UserContext";

export default function FavButton(props) {
	const {favs, add, remove } = useContext(FavContext);
	const { user } = useContext(UserContext);
	const [favorited, setFavorited] = useState(false);
	
	const handleClick = () => {
		setFavorited(prevState => {
			if (prevState) {
				remove(favs[props.imgId]);
			} else {
				add(props.imgId);
			}
			return !prevState;
		});
	};
	
	useEffect(() => {
		if (favs[props.imgId]) {
			setFavorited(true);
		}
	}, [favs, user, props.imgId, setFavorited]);
	
	return (
		<button onClick={handleClick} 
			disabled={user === null} 
			title={(user === null) ? "Login to favorite images" : undefined}
		>
			{favorited ? "Unfavorite" : "Favorite"}
		</button>
	);
}
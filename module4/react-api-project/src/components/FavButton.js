import React, { useContext, useEffect, useState } from "react";
import { FavContext } from "../contexts/FavContext";

export default function FavButton(props) {
	const {favs, add, remove } = useContext(FavContext);
	const {favorited, setFavorited} = useState(false);
	
	handleClick = () => {
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
	}, []);
	
	return (
		<button onClick={handleClick}>
			{on ? "Unfavorite" : "Favorite"}
		</button>
	);
}
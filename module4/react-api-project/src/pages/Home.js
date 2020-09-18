import React, { useEffect, useState } from "react";
import Axios from "axios";
import FavButton from "../components/FavButton";
import LargeImage from "../components/LargeImage";
import { baseUrl } from "../data.json";

export default function Home() {
	const [image, setImage] = useState({});
	
	useEffect(() => {
		randomKitty();
	}, []);
	
	const randomKitty = () => {
		Axios.get(`${baseUrl}images/search`).then(response => {
			setImage(response.data[0]);
		});
	};
	
	return (
		<>
		<h2>Random Kitty</h2>
			<div className="buttons">
				<FavButton imgId={image.id} />
				<button onClick={randomKitty}>Next Kitty!</button>
			</div>
			<LargeImage {...image} />
		</>
	);
}
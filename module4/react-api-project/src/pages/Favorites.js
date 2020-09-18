import React, { useContext, useEffect, useState } from "react";
import Axios from "axios";
import {baseUrl} from "../data.json";
import ImageGrid from "../components/ImageGrid";
import PaginationBar from "../components/PaginationBar";
import { FavContext } from "../contexts/FavContext";
import { UserContext } from "../contexts/UserContext";

export default function Favorites() {
	const {favs} = useContext(FavContext);
	const { user } = useContext(UserContext);
	const [images, setImages] = useState([]);
	const [page, setPage] = useState(0);
	
	useEffect(() => {
		const promises = []
		for (let imgId in favs) {
			promises.push(Axios.get(`${baseUrl}images/${imgId}`));
		}
		Promise.all(promises).then(responses => {
			const data = responses.map(res => res.data);
			setImages(data);
		});
	}, [user, favs]);
	
	const changePage = (p) => setPage(p);
	
	if (!user) {
		return (
			<>
			<h2>Favorites</h2>
			<p>Please enter a username to favorite and view your favorite images.</p>
			</>
		);
	} else if (images.length === 0) {
		return (
			<>
			<h2>Favorites</h2>
			<p>You have no favorited images.</p>
			</>
		);
	}
	return (
		<>
		<h2>Favorites</h2>
		<PaginationBar current={page} total={Math.ceil(images.length / 15)} change={changePage} />
		<ImageGrid images={images.slice(page * 15, page * 15 + 15)} />
			<PaginationBar current={page} total={Math.ceil(images.length / 15)} change={changePage} />
		</>
	);
	
}
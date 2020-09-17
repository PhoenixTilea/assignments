import React, { useEffect, useState } from "react";
import Axios from "axios";
import PaginationBar from "../components/PaginationBar";
import ImageGrid from "../components/ImageGrid";
import { baseUrl } from "../data.json";

export default function AllImages() {
	const [images, setImages] = useState([]);
	const [page, setPage] = useState(0);
	const [pageCount, setPageCount] = useState(0);
	
	useEffect(() => {
		const params = {limit: 30, page: page, order: "desc"};
		Axios.get(`${baseUrl}images/search`, {params}).then(response => {
			setImages(response.data);
			setPageCount(Math.ceil(response.headers["pagination-count] / 30));
		});
	}, [page]);
	
	render (
		<>
		<h2>All Images</h2>
		<PaginationBar current={page} total={pageCount} change={setPage} />
		<ImageGrid images={images} />
		<PaginationBar current={page} total={pageCount} change={setPage} />
		</>
	);
	
}
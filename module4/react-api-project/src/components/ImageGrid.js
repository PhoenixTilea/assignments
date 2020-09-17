import React from "react";
import ThumbImage from "./ThumbImage";
import FavButton from "./FavButton";
import "./ImageGrid.css";

export default function ImageGrid(props) {
	return (
	<ul className="image-grid">
		{props.images.map(image => )
			<li key={image.id}>
				<ThumbImage {...image} />
				<FavButton imgId={image.id} />
			</li>
		))}
	</ul>
	);
}
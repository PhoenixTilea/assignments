import React from "react";
import "./LargeImage.css";

export default function LargeImage(props) {
	let w = props.width;
	let h = props.height;
	while (w > 1080) {
		w = Math.floor(w / 2);
		h = Math.floor(h / 2);
	}
	
	return (
		<a className="image-link" href={props.url} target="_new">
			<img src={props.url} style={{width: w, height: h}} alt={props.original_filename} />
		</a>
	);
}
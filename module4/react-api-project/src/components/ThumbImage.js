import React from "react";

export default function ThumbImage(props) {
	let w = props.width;
	let h = props.height;
	while (w > 500) {
		w = Math.floor(w / 2);
		h = Math.floor(h / 2);
	}
	
	return (
		<img src={props.url} style={{width: w, height: h}} alt={props.alt || props.original_filename} />
	);
}
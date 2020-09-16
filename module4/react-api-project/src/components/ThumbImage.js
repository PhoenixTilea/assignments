import React from "react";

export default function ThumbImage(props) {
	let w = props.width;
	let h = props.height;
	while (w > 500) {
		w = Math.floor(w / 2);
		h = Math.floor(h / 2);
	}
	
	return (
		<img src={props.url} width={w} height={h} />
	);
}
import React from "react";
import "./Image.css";

export default function Image(props) {
	return (
		<div className="image-container">
			<img src={props.url} style={{width: props.width, height: props.height}} />
		</div>
	);
}
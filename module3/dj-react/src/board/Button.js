import React from "react";
import "./Button.css";

export default function Button(props) {
	return (
		<button className="dj-button" onClick={props.onClick}>
			{props.num}
		</button>
	);
}
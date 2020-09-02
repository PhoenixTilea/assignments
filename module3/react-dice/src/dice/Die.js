import React from "react";
import "./Die.css";

export default function Die(props) {
	let cl = "die ";
	let label = props.value + ", ";
	if (props.selected) {
		cl += "selected";
		label += "Selected, click to deselect";
	} else {
		label += "Click to select";
	}
	
	return (
		<button className={cl} onClick={props.onClick} aria-label={label}>
			{props.value}
		</button>
	);
}

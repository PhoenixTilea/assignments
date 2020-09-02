import React from "react";

export default function Hit(props) {
	return (
		<li>
			<img src={props.image} alt={props.name} />
			<strong>{props.name}</strong>
		</li>
	);
}
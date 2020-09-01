import React from "react";

function Pet(props) {
	return (
		<div>
			<strong>{props.name}</strong>
			<span>{" (" + props.breed + ")"}</span>
		</div>
	);
}

export default Pet;
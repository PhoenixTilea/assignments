import React from "react";

export default function Issue(props) {
	return (
		<li id={props._id} className="issue">
			<h2>{props.title}</h2>
			<p>{props.description}</p>
		</li>
	);
}
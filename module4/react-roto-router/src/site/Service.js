import React from "react";

export default function Service(props) {
	return (
		<li className="service">
			<h3>{props.name}</h3>
			<span>{`$${props.price}`}</span>
			<p>{props.desc}</p>
		</li>
	);
}
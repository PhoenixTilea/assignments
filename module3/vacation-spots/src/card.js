import React from "react";
import "./card.css";

function Card(props) {
	let dollars = "$";
	if (props.price >= 500) {
		dollars += "$";
		if (props.price >= 1000) {
			dollars += "$";
		}
	}
	
	return (
		<div className={"card " + props.timeToGo}>
			<h2>{props.place}</h2>
			<div>
				<strong>Price: </strong>
				<span>{ dollars + props.price }</span>
			</div>
			<div>
				<strong>Time to Go: </strong>
				<span>{props.timeToGo}</span>
			</div>
		</div>
	);
}

export default Card;
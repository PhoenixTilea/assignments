import React from "react";
import "./Badge.css";

export default function Badge(props) {
let phone = `(${props.phone.slice(0, 3)}) ${props.phone.slice(3, 6)}-${props.phone.slice(6)}`;
	return (
		<li className="badge">
			<h2 style={{backgroundColor: props.color}}>{props.name}</h2>
			<div>
				<strong>Email: </strong>
				<span>{props.email}</span>
			</div>
			<div>
				<strong>Phone: </strong>
				<span>{phone}</span>
			</div>
			<div>
				<strong>Birthplace: </strong>
				<span>{props.birthplace}</span>
			</div>
			<div>
				<strong>Favorite Food: </strong>
				<span>{props.favFood}</span>
			</div>
			<div className="about">
			{props.about}
			</div>
		</li>
	);
}
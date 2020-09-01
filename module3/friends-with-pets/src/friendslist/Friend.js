import React from "react";
import Pet from "./Pet";
import "./friend.css";

function Friend(props) {
	return (
		<div className="friend">
			<h2>{props.name}</h2>
			<div>
				<strong>Age: </strong>
				<span>{props.age}</span>
			</div>
			<strong>Pets: </strong>
			<ul className="pets-list">
			{props.pets.map(pet => <li><Pet name={pet.name} breed={pet.breed} /></li>)}
			</ul>
		</div>
	);
}

export default Friend;
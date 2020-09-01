import React from "react";
import Friend from "./Friend";
import "./friendsList.css";

const friends = [
	{
		name: "TJ",
		age: 13,
		pets : [
			{
				name: "Ariana",
				"breed" : "Boxerdore"
			},
			{
				name: "Dexter",
				breed: "Hound"
			}
	]
	},
	{
		name: "Brandon",
		age: 30,
		pets: [
			{
				name: "Skylar",
				breed: "American Shorthair"
			}
		]
	},
	{
		name: "Leon",
		age: 7,
		pets: [
			{
				name: "Rylie",
				breed: "German Shepard"
			},
			{
				name: "Lacey",
				breed: "Pikaniese"
			}
		]
	},
	{
		name: "Amanda",
		age: 32,
		pets: [
			{
				name: "Little Man",
				breed: "Doxin"
			}
		]
	},
	{
		name: "Miles",
		age: 27,
		pets: [
			{
				name: "Cally",
				breed: "Tabby"
			},
			{
				name: "Puff",
				breed: "Tabby"
			},
			{
				name: "Blue",
				breed: "German Shepard"
			}
		]
	}
];

function FriendsList() {
	return (
		<div className="friends-list">
		{friends.map(friend => <Friend name={friend.name} age={friend.age} pets={friend.pets} />)}
		</div>
	);
}

export default FriendsList;
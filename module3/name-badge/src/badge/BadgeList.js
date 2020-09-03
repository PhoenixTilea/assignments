import React from "react";
import Badge from "./Badge";
import "./BadgeList.css";

export default function BadgeList(props) {
	return (
		<ul className="badge-list">
			{props.badges.map((badge, index) => {
				let color = (index % 2 === 0) ? "blue" : "red";
				let name = badge.firstName + " " + badge.lastName;
				return (<Badge key={name + index} 
					name={name} 
					color={color}
					email={badge.email}
					phone={badge.phone}
					birthplace={badge.birthplace}
					favFood={badge.favFood}
					about={badge.about}
				/>);
			})}
		</ul>
	);
}
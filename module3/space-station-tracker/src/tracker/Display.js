import React from "react";

export default function Display(props) {
	let date = new Date();
	date.setTime(props.time * 1000);
	return (
		<div className="tracker-display">
			<h1>
			{`The ISS is over ${props.countryName} at ${props.lat}, ${props.long}`}
			</h1>
			<h2>
			{`Time: ${props.localTime ? date.toLocaleString() : date.toUTCString()}`}
			</h2>
		</div>
	);
}
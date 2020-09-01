import React from "react";
import Square from "./Square";
import "./Grid.css";

export default function Grid(props) {
	return (
		<div className="grid">
		{props.colors.map(color => <Square color={color} />)}
		</div>
	);
}
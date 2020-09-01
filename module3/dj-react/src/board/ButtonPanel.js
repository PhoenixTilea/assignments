import React from "react";
import Button from "./Button";
import "./ButtonPanel.css";

export default function ButtonPanel(props) {
	let btns = [];
	for (let i = 0; i < 8; i++) {
		btns.push(<Button onClick={() => props.onClick(i)} num={i + 1} />);
	}
	return (
	<div className="button-panel">
		{btns}
	</div>
	);
}
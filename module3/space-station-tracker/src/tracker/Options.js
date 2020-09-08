import React from "react";
import "./Options.css";

export default function Options(props) {
	return (
		<div className="tracker-options">
			<button name="time" onClick={props.onClick}>
				{`Show ${props.localTime ? "UTC" : "local"} time`}
			</button>
			<button name="update" disabled={props.cooldown > 0} onClick={props.onClick}>
				{props.cooldown > 0 ? props.cooldown : "Update"}
			</button>
		</div>
	);
}
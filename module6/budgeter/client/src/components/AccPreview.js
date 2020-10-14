import React from "react";
import { Link } from "react-router-dom";
import { formatMoney } from "../util";

export default function AccPreview(props) {
	const { _id, name, type, balance } = props;
	
	return (
		<li id={_id} className="acc-preview">
			<Link to={`/dashboard/account/${_id}`}>
				<h3>{name}</h3>
			</Link>
			<p>{type}</p>
			<div className="balance">
				<h4>CurrentBalance</h4>
				<h3>{formatMoney(balance)}</h3>
			</div>
		</li>
	);
}
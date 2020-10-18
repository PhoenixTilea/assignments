import React from "react";
import {formatMoney} from "../util";

export default function Transaction(props) {
	const { _id, amount, date, category, notes, openModal, deleteTransaction } = props;
	
	const handleClick = e=> {
		const { name } = e.target;
		switch (name) {
			case "edit":
				openModal(_id);
			break;
			case "delete":
				const del = window.confirm("Are you sure you want to delete this transaction?");
				if (del) {
					deleteTransaction(_id);
				}
			break;
			default: break;
		}
	};
	
	return (
		<tr className="transaction-row">
			<td>{new Date(date).toLocaleDateString()}</td>
			<td>{category}</td>
			<td>{notes}</td>
				{(amount >= 0) ? <>
						<td>{formatMoney(amount)}</td>
						<td> - </td>
					</>
					: <>
						<td> - </td>
						<td>{formatMoney(amount)}</td>
					</>
				}
				<td>
					<button name="edit" onClick={handleClick}>Edit</button>
					<button name="delete" onClick={handleClick}>Delete Transaction</button>
				</td>
		</tr>
	);
}
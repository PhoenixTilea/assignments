import React, {useContext, useRef} from "react";
import ModalDisplayContext from "../context/ModalDisplayContext";
import TransactionForm from "./TransactionForm";
import {formatMoney} from "../util";

export default function Transaction(props) {
	const { transaction, update, deleteTransaction } = props;
	const {_id, amount, date, category, notes } = transaction;
	const {openModal, closeModal } = useContext(ModalDisplayContext);
	const editBtn = useRef(null);
	
	const handleModalOpen = () => {
		const header = <h1>Edit Transaction</h1>;
		const body = <TransactionForm update={handleUpdate} transaction={transaction} />;
		const footer = null;
		const close = () => {
			editBtn.current.focus();
		};
		
		openModal(header, body, footer, close);
	};
	
	const handleUpdate = data => {
		update(_id, data);
		closeModal();
	};
	
	const handleDelete = () => {
		const del = window.confirm("Are you sure you want to delete this transaction?");
		if (del) {
			deleteTransaction(_id);
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
					<button onClick={handleModalOpen}>Edit</button>
					<button onClick={handleDelete}>Delete Transaction</button>
				</td>
		</tr>
	);
}
import React, { useState } from "react";
import Transaction from "./Transaction";
import Modal from "./Modal";
import TransactionForm from "./TransactionForm";

export default function TransactionTable(props) {
	const { transactions, account, updateTransaction, deleteTransaction } = props;
	const [modal, setModal] = useState({
		show: false,
		transaction: null
	});
	
	const handleModalOpen = trId => {
		setModal({show: true, transaction: transactions.find(tr => tr._id === trId)});
	};
	
	const handleModalClose = () => {
		setModal({show: false, transaction: null});
	};
	
	const handleUpdate = (id, data) => {
		updateTransaction(account, id, data);
		handleModalClose();
	};
	
	const handleDelete = id => {
		deleteTransaction(account, id);
	};
	
	return (
		<table className="transaction-table">
			<tbody>
				<tr className="column-headers">
					<th>Transaction Date</th>
					<th>Category</th>
					<th>Description</th>
					<th>Deposit Amount</th>
					<th>Withdrawal Amount</th>
					<th>Actions</th>
				</tr>
				{transactions.map(tr => (
					<Transaction key={tr._id} {...tr} deleteTransaction={handleDelete} openModal={handleModalOpen} />
				))}
			</tbody>
			{(modal.show) && <Modal onModalClose={handleModalClose}>
					<Modal.Header>
						<h1>Edit Transaction</h1>
					</Modal.Header>
					<Modal.Body>
						<TransactionForm transaction={modal.transaction} update={handleUpdate} />
					</Modal.Body>
					<Modal.Footer>
						<Modal.Footer.CloseBtn>Cancel</Modal.Footer.CloseBtn>
					</Modal.Footer>
				</Modal>
			}
		</table>
	);
}
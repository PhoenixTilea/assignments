import React from "react";
import Transaction from "./Transaction";

export default function TransactionTable(props) {
	const { transactions, account, updateTransaction, deleteTransaction } = props;
	
	const handleUpdate = (id, data) => {
		updateTransaction(account, id, data);
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
					<Transaction key={tr._id} transaction={tr} deleteTransaction={handleDelete} update={handleUpdate} />
				))}
			</tbody>
		</table>
	);
}
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AccContext from "../context/AccContext";
import Modal from "../components/Modal";
import EditAccountBtn from "../components/EditAccountBtn";
import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionTable";
import { formatMoney } from "../util";

export default function AccountPage() {
	const { accId } = useParams();
	const { accounts, addTransaction, updateTransaction, deleteTransaction } = useContext(AccContext);
	const [account, setAccount] = useState({});
	const [showModal, setShowModal] = useState(false);
	const btn = useRef(null);
	
	useEffect(() => {
		setAccount(accounts.find(acc => acc._id === accId));
		// eslint-disable-next-line
	}, [accounts]);
	
	const handleAdd = data => {
		addTransaction(accId, data);
		handleModalClose();
	};
	
	const handleModalClose = () => {
		setShowModal(false);
		btn.current.focus();
	};
	
	return (
	<main id="account-page">
	{(account) && <>
			<h1>{account.name}</h1>
			<EditAccountBtn account={account} />
			<div>
				<h3>Account Type</h3>
				<p>{account.type}</p>
			</div>
			<div>
				<h3>Current Balance</h3>
				<h2>{formatMoney(account.balance)}</h2>
			</div>
			<hr />
			<h2>Transactions</h2>
			<button ref={btn} onClick={() => setShowModal(true)}>New Transaction</button>
				{(showModal) && <Modal onModalClose={handleModalClose}>
						<Modal.Header>
							<h1>New Transaction</h1>
						</Modal.Header>
						<Modal.Body>
							<TransactionForm add={handleAdd} />
						</Modal.Body>
						<Modal.Footer>
							<Modal.Footer.CloseBtn>Cancel</Modal.Footer.CloseBtn>
						</Modal.Footer>
					</Modal>
				}
				<TransactionTable transactions={account.transactions || []} deleteTransaction={deleteTransaction} account={accId} updateTransaction={updateTransaction} />
	</>}
		</main>
	);
}
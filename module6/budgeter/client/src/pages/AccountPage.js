import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AccContext from "../context/AccContext";
import ModalDisplayContext from "../context/ModalDisplayContext";
import EditAccountBtn from "../components/EditAccountBtn";
import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionTable";
import { formatMoney } from "../util";

export default function AccountPage() {
	const { accId } = useParams();
	const { accounts, addTransaction, updateTransaction, deleteTransaction } = useContext(AccContext);
	const { openModal, closeModal } = useContext(ModalDisplayContext);
	const [account, setAccount] = useState({});
	const newTrBtn = useRef(null);
	
	useEffect(() => {
		setAccount(accounts.find(acc => acc._id === accId));
		// eslint-disable-next-line
	}, [accounts]);
	
	const handleAdd = data => {
		addTransaction(accId, data);
		closeModal();
	};
	
	const openNewTrModal = () => {
		const header = [<h1>New Transaction</h1>];
		const body = [<TransactionForm add={handleAdd} />];
		const footer = null;
		const close = () => {
			newTrBtn.current.focus();
		};
		
		openModal(header, body, footer, close);
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
			<button ref={newTrBtn} onClick={openNewTrModal}>New Transaction</button>
				<TransactionTable transactions={account.transactions || []} deleteTransaction={deleteTransaction} account={accId} updateTransaction={updateTransaction} />
	</>}
		</main>
	);
}
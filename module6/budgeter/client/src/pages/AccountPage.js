import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AccContext from "../context/AccContext";
import { formatMoney } from "../util";

export default function AccountPage() {
	const { accId } = useParams();
	const { accounts } = useContext(AccContext);
	const [account, setAccount] = useState({});
	
	useEffect(() => {
		setAccount(accounts.find(acc => acc._id === accId));
		// eslint-disable-next-line
	}, [accounts]);
	
	return (
		<main id="account-page">
			<h1>{account.name}</h1>
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
		</main>
	);
}
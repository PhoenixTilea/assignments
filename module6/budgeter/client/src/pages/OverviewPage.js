import React, { useContext } from "react";
import AccContext from "../context/AccContext";
import NewAccButton from "../components/NewAccButton";
import AccPreview from "../components/AccPreview";
import { formatMoney } from "../util.js";

export default function OverviewPage() {
	const { accounts, addAccount } = useContext(AccContext);
	
	const printTotalFunds = () => {
		const total = accounts.reduce((sum, acc) => sum + acc.balance, 0);
		return formatMoney(total);
	};
	
	return (
		<main id="overview-page">
			<h1>Overview</h1>
			<div id="funds">
				<h2>Total Funds:
					<span>{printTotalFunds()}</span>
				</h2>
			</div>
			<hr />
			<div id="accounts">
				<h2>Accounts</h2>
				<NewAccButton addAccount={addAccount} />
				<ul id="accounts-list">
					{accounts.map(acc => (
						<AccPreview {...acc} key={acc._id} />
					))}
				</ul>
			</div>
			<div id="expenses">
				<h2>Upcoming Expenses</h2>
				<NewIEButton />
			</div>
			<div id="incomes">
				<h2>Upcoming Income</h2>
				<NewIEButton income={true} />
			</div>
		</main>
	);
}
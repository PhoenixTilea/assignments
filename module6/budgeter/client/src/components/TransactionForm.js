import React, { useEffect, useRef, useState } from "react";
import { expense, income } from "../categories.json";

export default function TransactionForm(props) {
	const now = new Date().toISOString().slice(0, 10);
	const { transaction, add, update } = props;
	const [fields, setFields] = useState({
		amount: Math.abs(transaction?.amount) || 0,
		deposit: (transaction?.amount >= 0) || false,
		category: transaction?.category || "",
		date: transaction?.date?.slice(0, 10) || now,
		notes: transaction?.notes || ""
	});
	const auto = useRef(null);
	
	useEffect(() => {
		auto.current.focus();
		// eslint-disable-next-line
	}, []);
	
	const handleChange = e => {
		const {name, value } = e.target;
		setFields(prevFields => ({...prevFields, [name]: value}));
	};
	
	const handleSubmit = e => {
		e.preventDefault();
		const data = {...fields};
		if (!data.deposit) {
			data.amount *= -1;
		}
		if (data.category === "") {
			data.category = "Misc";
		}
		if (add) {
			add(data);
		} else {
			for (let id in data) {
				if (data[id] === transaction[id]) {
					delete data[id];
				}
			}
			update(transaction._id, data);
		}
	};
	
	return (
		<form onSubmit={handleSubmit}>
			<label>
				<strong>Amount: $</strong>
				<input type="number" name="amount" value={fields.amount} step={0.01} min={0} onChange={handleChange} ref={auto} required />
			</label>
			<div role="radiogroup" aria-label="transaction type">
				<label>
					<input type="radio" name="deposit" value={true} checked={fields.deposit} onChange={handleChange} />
					<strong> Deposit</strong>
				</label>
				<label>
					<input type="radio" name="deposit" value={""} checked={!fields.deposit} onChange={handleChange} />
					<strong> Withdrawal</strong>
				</label>
			</div>
			<label>
				<strong>Category: </strong>
				<select name="category" value={fields.category} onChange={handleChange}>
					<option value="">-- Select an Option --</option>
					{(fields.deposit) ?
						income.map(c => <option key={c} value={c}>{c}</option>)
						: expense.map(c => <option key={c} value={c}>{c}</option>)
					}
				</select>
			</label>
			<label>
				<strong>Transaction Date</strong>
				<input type="date" name="date" value={fields.date} onChange={handleChange} required />
			</label>
			<label>
				<strong> Notes: </strong>
				<input type="text" name="notes" value={fields.notes} placeholder="Briefly describe this transaction" onChange={handleChange} required />
			</label>
			<button>{(add) ? "Add Transaction" : "Save Changes"}</button>
		</form>
	);
}
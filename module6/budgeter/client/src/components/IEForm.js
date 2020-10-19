import React, { useContext, useEffect, useRef, useState } from "react";
import AccContext from "../context/AccContext";
import { expense, income } from "../categories.json";

export default function IEForm(props) {
	const { accounts } = usecontext(AccContext);
	const { expense, income, add, update } = props;
	const [fields, setFields] = useState({
		income: expense?.amount > 0 || income,
		amount: expense?.amount || 0,
		due: expense?.due.slice(0, 10) || "",
		account: expense?.account || "",
		auto: expense.auto || false,
		category: expense?.category || "Misc",
		notes: expense?.notes || ""
	});
	const autofocus = useRef(null);
	
	useEffect(() => {
		autofocus.current.focus();
		// eslint-disable-next-line
	}, []);
	
	const handleChange = e => {
		const {name, value, checked } = e.target;
		if (checked !== undefined) {
			setFields(prevFields => ({...prevFields, [name]: checked}));
		} else {
			setFields(prevFields => ({...prevFields, [name] : value}));
		}
	};
	
	const handleSubmit = e => {
		const data = {...fields};
		if (!data.income) {
			data.amount *= -1;
		}
		
		if (add) {
			add(data);
		} else {
			for (let id in fields) {
				if (data[id] === fields[id]) {
					delete data[id];
				}
			}
			update(expense._id, data);
		}
	};
	
	return (
		<form onSubmit={handleSubmit}>
			<label>
				<strong>Amount: $</strong>
				<input type="number" name="amount" value={fields.amount} min={0.01} step={0.01} onChange={handleChange} ref={autofocus} required />
			</label>
			<div role="radiogroup" aria-label="transaction type">
			<label>
				<input type="radio" name="income" value={true} checked={fields.income} onChange={handleChange} required />
				<strong>Income</strong>
			</label>
			<label>
				<input type="radio" name="income" value={""} checked={!fields.income} onChange={handleChange} required />
			</label>
			</div>
			<label>
				<strong>Account: </strong>
				<select name="account" value={fields.account}>
					{accounts.map(acc => <option key={acc._id} value={acc._id}>{acc.name}</option>)}
				</select>
			</label>
			<label>
				<strong>Due Date: </strong>
				<input type="date" name="due" value={fields.due} onChange={handleChange} required />
			</label>
			<label>
				<input type="checkbox" name="auto" value={true} checked={fields.auto} onChange={handleChange} />
				<strong>Perform this transaction automatically when it is due</strong>
			</label>
			<label>
				<strong>Category: </strong>
				<select name="category" value={fields.category}>
					{(fields.income) ?
						income.map(c => <option key={c} value={c}>{c}</option>)
						: expense.map(c => <option key={c} value={c}>{c}</option>)
					}
				</select>
			</label>
			<label>
				<strong>Notes: </strong>
				<textarea name="notes" value={fields.notes} onChange={handleChange}></textarea>
			</label>
		</form>
	);
}
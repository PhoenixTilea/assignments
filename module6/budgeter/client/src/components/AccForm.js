import React, { useEffect, useRef, useState } from "react";
import { accTypes } from "../data.json";

export default function AccForm(props) {
	const {add, update } = props;
	const [fields, setFields] = useState({
		name: props.name || "",
		type: props.type || null,
		balance: props.balance || 0
	});
	const auto = useRef(null);
	const submit = useRef(null);
	
	useEffect(() => {
		auto.current.focus();
		// eslint-disable-next-line
	}, []);
	
	const handleChange = e => {
		const {name, value} = e.target;
		setFields(prevFields => ({...prevFields, [name] : value}));
	};
	
	const handleSubmit = e => {
		e.preventDefault();
		submit.current.setAttribute("disabled", true);
		submit.current.focus();
		if (add) {
			add(fields);
		} else {
			update(fields);
		}
	};
	
	return (
		<form onSubmit={handleSubmit}>
			<label>
				<strong>Account Name: </strong>
				<input type="text" name="name" value={fields.name} onChange={handleChange} ref={auto} required />
			</label>
			<label>
				<strong>Account Type: </strong>
				<select name="type" value={fields.type} onChange={handleChange} required>
					<option value={null}>-- Select an account type --</option>
						{accTypes.map(t => <option key={t.value} value={t.value}>{t.name}</option>)}
				</select>
			</label>
			<label>
				<strong>Current Balance: </strong>
				<input type="number" name="balance" value={fields.balance} step={0.01} onChange={handleChange} required />
			</label>
			<button ref={submit}>{(add) ? "Add Account" : "Save Changes"}</button>
		</form>
	);
}
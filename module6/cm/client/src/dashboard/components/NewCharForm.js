import React, { useEffect, useRef, useState } from "react";

export default function NewCharForm(props) {
	const { add, hide } = props;
	const [fields, setFields] = useState({
		name: "",
		ac: "",
		maxHp: ""
	});
	const firstField = useRef(null);
	
	useEffect(() => {
		firstField.current.focus();
	}, []);
	
	const handleChange = e => {
		const {name, value} = e.target;
		setFields(prevFields => ({...prevFields, [name] : value}));
	};
	
	const handleSubmit = e => {
		e.preventDefault();
		const chr = {...fields};
		chr.hp = chr.maxHp;
		
		add(chr);
		hide();
	};
	
	return (
		<form id="new-char-form" onSubmit={handleSubmit}>
			<h2>Create a New Character</h2>
			<label>
				<strong>Name: </strong>
				<input type="text" name="charName" value={fields.charName} onChange={handleChange} ref={firstField} required />
			</label>
			<label>
				<strong>Armor Class (AC): </strong>
				<input type="number" name="ac" value={fields.ac} onChange={handleChange} required />
			</label>
			<label>
				<strong>Max HP: </strong>
				<input type="number" name="maxHp" value={fields.maxHp} min={1} onChange={handleChange} required />
			</label>
			<button>Create</button>
			<button onClick={hide}>Cancel</button>
		</form>
	);
}
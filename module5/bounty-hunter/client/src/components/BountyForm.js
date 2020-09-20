import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { BountyContext } from "./BountyContext";
import "./BountyForm.css";

function BountyForm(props) {
	const [fields, setFields] = useState({
		firstname: props.firstname,
		lastname: props.lastname,
		living: props.living,
		amount: props.amount,
		type: props.type
	});
	const fname = useRef(null);
	const {add, update} = useContext(BountyContext);
	
	useEffect(() => {
		setFields({
		firstname: props.firstname,
		lastname: props.lastname,
		living: props.living,
		amount: props.amount,
		type: props.type
	});
	}, [props]);
	
	const handleChange = (e) => {
	const {name, value, checked} = e.target;
	if (name === "living") {
		setFields(prevFields => ({...prevFields, living: checked}));
	} else {
		setFields(prevFields => ({...prevFields, [name]: value}));
	}
	};
	
	const handleSubmit = (e) => {
		e.preventDefault();
		if (props.submitText === "Add") {
			add(fields);
		} else {
			update(props._id, fields);
		}
		props.clear();
		fname.current.focus();
	};
	
	return (
		<form id="bounty-form" onSubmit={handleSubmit}>
			<label>
				<strong>Firstname: </strong>
				<input type="text" name="firstname" value={fields.firstname} onChange={handleChange} ref={fname} required />
			</label>
			<label>
				<strong>Lastname: </strong>
				<input type="text" name="lastname" value={fields.lastname} onChange={handleChange} required />
			</label>
			<label>
				<strong>Type: </strong>
				<select name="type" value={fields.type} onChange={handleChange}>
					<option value="Jedi">Jedi</option>
					<option value="Sith">Sith</option>
				</select>
			</label>
			<label>
				<strong>Bounty Amount: </strong>
				<input type="number" min={0} name="amount" value={fields.amount} onChange={handleChange} required />
			</label>
			<label>
				<input type="checkbox" name="living" value="living" checked={fields.living} onChange={handleChange} />
				<strong>Living</strong>
			</label>
			<button>{props.submitText}</button>
		</form>
	);
}
BountyForm.propTypes = {
	firstname: PropTypes.string,
	lastname: PropTypes.string,
	type: PropTypes.oneOf(["Jedi", "Sith"]),
	amount: PropTypes.number,
	living: PropTypes.bool,
	submitText: PropTypes.oneOf(["Add", "Save"]).isRequired,
};
BountyForm.defaultProps = {
	firstname: "",
	lastname: "",
	type: "Jedi",
	amount: 0,
	living: true
};

export default BountyForm;
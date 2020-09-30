import React, { useState } from "react";

export default function AuthForm(props) {
	const [fields, setFields] = useState({
		username: "",
		password: "",
	});
	
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFields(prevFields => ({...prevFields, [name]: value}));
	};
	
	const handleSubmit = (e) => {
		e.preventDefault();
		props.submit(fields);
	};
	
	return (
		<form onSubmit={handleSubmit}>
			<label>
				<strong>Username: </strong>
				<input type="text" name="username" value={fields.username} onChange={handleChange} required autofocus />
			</label><br />
			<label>
				<strong>Password: </strong>
				<input type="password" name="password" value={fields.password} onChange={handleChange} required />
			</label>
			<button>{props.submitText}</button>
		</form>
	);
}
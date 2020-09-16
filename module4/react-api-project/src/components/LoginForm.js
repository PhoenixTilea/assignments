import React, { useState } from "react";

export default function LoginForm(props) {
	const [name, setName] = useState("");
	
	const handleChange = (e) => setName(e.target.value);
	const handleSubmit = (e) => {
		e.preventDefault();
		props.login(name);
	};
	
	return (
		<form onSubmit={handleSubmit}>
			<label>
				<strong>Username: </strong>
				<input type="text" value={name} onChange={handleChange} required />
				<button>Login</button>
			</label>
		</form>
	);
}
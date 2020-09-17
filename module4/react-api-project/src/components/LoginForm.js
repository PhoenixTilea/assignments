import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

export default function LoginForm() {
	const [name, setName] = useState("");
	const { login } = useContext(UserContext);
	
	const handleChange = (e) => setName(e.target.value);
	const handleSubmit = (e) => {
		e.preventDefault();
		login(name);
	};
	
	return (
		<form onSubmit={handleSubmit}>
			<label>
				<strong>Username: </strong>
				<input type="text" value={name} onChange={handleChange} required />
			</label>
			<button>Login</button>
		</form>
	);
}
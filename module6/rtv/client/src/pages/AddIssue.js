import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function AddIssue() {
	const { addIssue } = useContext(UserContext);
	const [fields, setFields] = useState({
		title: "",
		description: ""
	});
	const [redirect, setRedirect] = useState(null);
	
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFields(prevFields => ({...prevFields, [name]: value}));
	};
	
	const handleSubmit = (e) => {
		e.preventDefault();
		addIssue(fields);
		setFields({title: "", description: ""});
		setRedirect("/profile");
	};
	
	return (
		<>
		{(redirect) && <Redirect to={redirect} />}
		<h1>Post a New Issue</h1>
		<form onSubmit={handleSubmit}>
			<label>
				<strong>Title: </strong>
				<input type="text" name="title" value={fields.title} onChange={handleChange} required />
			</label>
			<label>
				<strong>Description: </strong>
<textarea name="description" value={fields.description} onChange={handleChange} required></textarea>
			</label>
			<button>Post</button>
		</form>
		</>
	);
}
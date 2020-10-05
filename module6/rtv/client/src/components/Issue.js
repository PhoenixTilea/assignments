import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

export default function Issue(props) {
	const { user } = useContext(UserContext);
	const [edit, setEdit] = useState({
		editing: false,
		title: props.title,
		description: props.description
	});
	
	const handleClick = (e) => {
		const { name } = e.target;
		switch (name) {
			case "edit":
				setEdit(prevEdit => ({...prevEdit, editing: true}));
			break;
			case "cancel":
				setEdit({
					title: props.title,
					description: props.description,
					editing: false
				});
			break;
			case "delete":
				props.deleteIssue(props._id);
			break;
			default: break;
		}
	};
	
	const handleChange = (e) => {
		const { name, value } = e.target;
		setEdit(prevEdit => ({...prevEdit, [name] : value}));
	};
	
	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {};
		if (edit.title !== props.title) {
			data.title = edit.title;
		}
		if (edit.description !== props.description) {
			data.description = edit.description;
		}
		if (data) {
			props.updateIssue(props._id, data);
		}
		setEdit(prevEdit => ({...prevEdit, editing: false}));
	};
	
	return (
		<div className="issue">
			{(edit.editing) ? <form onSubmit={handleSubmit}>
					<label>
						<strong>Title: </strong>
						<input type="text" name="title" value={edit.title} onChange={handleChange} required />
					</label>
					<label>
						<strong>Description: </strong>
						<textarea name="description" value={edit.description} onChange={handleChange} required></textarea>
					</label>
					<button>Save</button>
					<button name="cancel" onClick={handleClick}>Cancel</button>
				</form>
				: <>
					<h2>{props.title}</h2>
					<p>{props.description}</p>
					<p>{props.user}</p>
					<p>{user._id}</p>
					<div className="votes">
					
					</div>
					{(user && user._id === props.user) && <div className="mod-buttons">
							<button name="edit" onClick={handleClick}>Edit</button>
							<button name="delete" onClick={handleClick}>Delete</button>
						</div>
					}
				</>
			}
		</div>
	);
}
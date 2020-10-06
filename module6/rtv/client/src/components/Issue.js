import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { IssueContext } from "../context/IssueContext";
import VoteButtons from "./VoteButtons";
import CommentList from "./CommentList";

export default function Issue(props) {
	const {_id, title, description, upVotes, downVotes, closeIssue } = props;
	const { token, user } = useContext(UserContext);
	const { updateIssue, deleteIssue, comments, addComment, getComments, deleteComment } = useContext(IssueContext);
	const [edit, setEdit] = useState({editing: false, title, description});
	const [newComment, setNewComment] = useState({show: false, text: ""});
	
	useEffect(() => {
		getComments(_id);
		// eslint-disable-next-line
	}, []);
	
	const handleClick = (e) => {
		const {name} = e.target;
		switch (name) {
			case "close":
				closeIssue();
			break;
			case "edit":
				setEdit(prevEdit => ({...prevEdit, editing: true}));
			break;
			case "delete":
				const del = window.confirm("Are you sure you want to permanently delete this issue?");
				if (del) deleteIssue(_id);
			break;
			case "cancelEdit":
				setEdit({editing: false, title, description});
			break;
			case "addComment":
				setNewComment({show: true, text: ""});
			break;
			case "cancelAdd":
				setNewComment({show: false, text: ""});
			break;
			default: break;
		}
	};
	
	const handleChange = (e) => {
		const {name, value} = e.target;
		if (name === "text") {
			setNewComment({show: true, text: value});
		} else {
			setEdit(prevEdit => ({...prevEdit, [name]: value}));
		}
	};
	
	const handleSubmit = (e) => {
		e.preventDefault();
		const form = e.target.name;
		if (form === "comment") {
			addComment({text: newComment.text}, _id);
			setNewComment({show: false, text: ""});
		} else {
			const data = {};
			if (title !== edit.title) {
				data.title = edit.title;
			}
			if (description !== edit.description) {
				data.description = edit.description;
			}
			updateIssue(_id, data);
			setEdit(prevEdit => ({...prevEdit, editing: false}));
		}
	};
	
	
	return (
		<div className="issue">
		<button title="Close Issue" onClick={closeIssue}>Close</button>
		{(edit.editing) ? <form name="edit" onSubmit={handleSubmit}>
				<label>
					<strong>Title: </strong>
					<input type="text" name="title" value={edit.title} onChange={handleChange} required />
				</label>
				<label>
					<strong>Description: </strong>
					<textarea name="description" value={edit.description} onChange={handleChange} required></textarea>
				</label>
				<button>Save</button>
				<button name="cancelEdit" onClick={handleClick}>Cancel</button>
			</form>
			: <>
				<h1>{title}</h1>
				<p>{description}</p>
				<VoteButtons user={user ? user._id : null} upVotes={upVotes} downVotes={downVotes} issueId={_id} />
					
					{(user._id === props.user) && <div className="mod-buttons">
							<button name="edit" onClick={handleClick}>Edit</button>
					<button name="delete" onClick={handleClick}>Delete</button>
						</div>
					}
			</>
		}
		<hr />
		
		<h2>Comments</h2>
		<CommentList comments={comments} user={user._id} deleteComment={deleteComment} />
		
		{(token) && <>{(newComment.show) ? <form name="comment" onSubmit={handleSubmit}>
				<label>
					<strong>Comment Text: </strong>
					<textarea name="text" value={newComment.text} onChange={handleChange} required></textarea>
				</label>
				<button>Post</button>
				<button name="cancelAdd" onClick={handleClick}>Cancel</button>
			</form>
			: <button name="addComment" onClick={handleClick}>Add a Comment</button>
		}</>}
		</div>
	);
}
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

export const IssueContext = React.createContext();

export function IssueContextProvider(props) {
	const { userAxios } = useContext(UserContext);
	const [issues, setIssues] = useState([]);
	const [comments, setComments] = useState([]);
	
	useEffect(() => {
		axios.get("/issues").then(response => setIssues(response.data))
			.catch(err => console.error(err));
	}, []);
	
	const addIssue = (issue) => {
		userAxios.post("/protected/issues", issue).then(response => {
			setIssues(prevIssues => [...prevIssues, response.data]);
		}).catch(err => console.error(err));
	};
	
	const addComment = (comment, issueId) => {
		userAxios.post(`/protected/comments/${issueId}`, comment).then(response => setComments(prevComments => [...prevComments, response.data]))
			.catch(err => console.error(err));
	};
	
	const updateIssue = (id, data) => {
		userAxios.put(`/protected/issues/${id}`, data).then(response => {
			const index = issues.findIndex(issue => issue._id === response.data._id);
			const updatedIssues = [...issues];
			updatedIssues[index] = response.data;
			setIssues(updatedIssues);
		}).catch(err => console.error(err));
	};
	
	const deleteIssue = (id) => {
		userAxios.delete(`/protected/issues/${id}`).then(response => {
			const updatedIssues = [...issues].filter(issue => issue._id !== id);
			setIssues(updatedIssues);
		}).catch(err => console.error(err));
	};
	
	const deleteComment = (id) => {
		userAxios.delete(`/protected/comments/${id}`).then(response => {
			const updatedComments = [...comments].filter(comment => comment._id !== id);
			setComments(updatedComments);
		}).catch(err => console.error(err));
	};
	
	const getUserIssues = (userId) => {
		return issues.filter(issue => issue.user === userId);
	};
	
	const getComments = (issueId) => {
		axios.get(`/comments/${issueId}`).then(response => setComments(response.data))
			.catch(err => console.error(err));
	};
	
	const upVoteIssue = (id) => {
		userAxios.put(`/protected/issues/upvote/${id}`).then(response => {
			const index = issues.findIndex(issue => issue._id === id);
			const updatedIssues = [...issues];
			updatedIssues.splice(index, 1, response.data);
			setIssues(updatedIssues);
		}).catch(err => console.error(err));
	};
	
	const downVoteIssue = (id) => {
		userAxios.put(`/protected/issues/downvote/${id}`).then(response => {
			const index = issues.findIndex(issue => issue._id === id);
			const updatedIssues = [...issues];
			updatedIssues.splice(index, 1, response.data);
			setIssues(updatedIssues);
		}).catch(err => console.error(err));
	};
	
	const value = { issues, comments, addIssue, addComment, updateIssue, deleteIssue, deleteComment, getUserIssues, getComments , upVoteIssue, downVoteIssue};
	return (
		<IssueContext.Provider value={value}>
			{props.children}
		</IssueContext.Provider>
	);
}
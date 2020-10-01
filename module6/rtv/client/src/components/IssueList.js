import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import Issue from "./Issue";

export default function IssueList(props) {
	const { updateUser, userAxios } = useContext(UserContext);
	const { issues, setIssues } = props;
	const [userIndex, setUserIndex] = useState({});
	
	useEffect(() => {
		const promises = [];
		const users = {};
		issues.forEach(issue => {
			if (!userIndex[issue.user]) {
				promises.push(axios.get(`/user/${issue.user}`).then(response => users[response.data._id] = response.data.username));
			}
		});
		Promise.all(promises).then(() => setUserIndex(users)).catch(err => console.error(err));
	}, []);
	
	const deleteIssue = (issueId) => {
		userAxios.delete(`/protected/issues/${issueId}`).then(() => {
			const updatedIssues = issues.filter(issue => issue._id !== issueId);
			setIssues(updatedIssues);
		}).catch(err => console.error(err));
	};
	
	const upVote = (issueId) => {
		userAxios.put(`/protected/issues/upvote/${issueId}`).then(response => {
			const index = issues.findIndex(issue => issue._id === issueId);
			const i = [...issues];
			i.splice(index, 1, response.data);
			setIssues(i);
			updateUser();
		}).catch(err => console.error(err));
	};
	
	const downVote = (issueId) => {
		userAxios.put(`/protected/issues/downvote/${issueId}`).then(response => {
			const index = issues.findIndex(issue => issue._id === issueId);
			const i = [...issues];
			i.splice(index, 1, response.data);
			setIssues(i);
			updateUser();
		}).catch(err => console.error(err));
	};
	
	const methods = {deleteIssue, upVote, downVote};
	return (
		<>
		{(userIndex) ? <ul id="issue-list">
			{issues.map(issue => (
				<Issue key={issue._id} {...issue} author={userIndex[issue.user]} {...methods} />
			))}
			</ul>
			: <div>Loading...</div>
		}
		</>
	);
}
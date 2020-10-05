import React, { useContext } from "react";
import { IssueContext } from "../context/IssueContext";
import Issue from "./Issue";

export default function IssueList(props) {
	const { issues, updateIssue, deleteIssue, getUserIssues } = useContext(IssueContext);
	
	const renderIssue = (issue) => {
		return <Issue key={issue._id} {...issue} updateIssue={updateIssue} deleteIssue={deleteIssue} />
	};
	
	return (
		<div id="issue-list">
			{(props.user) ? getUserIssues(props.user).map(renderIssue)
				: issues.map(renderIssue)
			}
		</div>
	);
	
	
}
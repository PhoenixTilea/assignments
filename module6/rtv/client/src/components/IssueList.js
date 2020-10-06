import React, { useContext, useEffect, useState } from "react";
import { IssueContext } from "../context/IssueContext";
import IssuePreview from "./IssuePreview";
import Issue from "./Issue";
import "./styles/IssueList.css";

export default function IssueList(props) {
	const { issues, getUserIssues } = useContext(IssueContext);
	const [currentIssue, setCurrentIssue] = useState(null);
	
	useEffect(() => {
		if (currentIssue) {
			openIssue(currentIssue._id);
		} // eslint-disable-next-line
	}, [issues]);
	
	const openIssue = (id) => {
		setCurrentIssue(issues.find(i => i._id === id));
	};
	
	const closeIssue = () => {
		setCurrentIssue(null);
	};
	
	const renderIssuePreview = (issue) => {
		return <li key={issue._id}><IssuePreview {...issue} openIssue={openIssue} /></li>;
	};
	
	return (
		<div id="issue-page">
			<ul id="issue-list">
				{(props.user) ? getUserIssues(props.user).map(renderIssuePreview)
					: issues.map(renderIssuePreview)
				}
			</ul>
			{(currentIssue) && <Issue {...currentIssue} closeIssue={closeIssue} />}
		</div>
	);
	
	
}
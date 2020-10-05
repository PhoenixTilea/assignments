import React from "react";
import IssueList from "../components/IssueList";

export default function UserIssues(props) {
	return (
		<>
		<h1>Your Issues</h1>
		<IssueList user={props.user} />
		</>
	);
}
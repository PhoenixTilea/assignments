import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Issue from "../components/Issue";

export default function UserIssue() {
	const { issues } = useContext(UserContext);
	
	return (
		<>
		<h1>Your Issues</h1>
		<ul id="issues">
		{issues.map(issue => <Issue key={issue._id} {...issue} />)}
		</ul>
		</>
	);
}
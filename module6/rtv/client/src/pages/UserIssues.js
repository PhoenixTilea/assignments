import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import IssueList from "../components/IssueList";

export default function UserIssues() {
	const { userAxios } = useContext(UserContext);
	const [issues, setIssues] = useState([]);
	
	useEffect(() => {
		userAxios.get("/protected/issues").then(response => setIssues(response.data))
			.catch(err => console.error(err));
	}, []);
	
	return (
		<>
		<h1>Your Issues</h1>
		<IssueList issues={issues} setIssues={setIssues} />
		</>
	);
}
import React, { useEffect, useState } from "react";
import axios from "axios";
import IssueList from "../components/IssueList";

export default function Home() {
	const [issues, setIssues] = useState([]);
	
	useEffect(() => {
		axios.get("/issues").then(response => {
			setIssues(response.data);
		}).catch(err => console.error(err));
		// eslint-disable-next-line
	}, []);
	
	return (
		<>
			<h1>Issues</h1>
			<IssueList issues={issues} setIssues={setIssues} />
		</>
	);
}
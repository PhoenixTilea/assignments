import React, { useEffect, useState } from "react";
import axios from "axios";
import Issue from "../components/Issue";

export default function Home() {
	const [issues, setIssues] = useState([]);
	
	useEffect(() => {
		axios.get("/issues").then(response => {
			setIssues(response.data);
		}).catch(err => console.error(err));
	}, []);
	
	return (
		<>
			<h1>Issues</h1>
			<ul id="issues">
				{issues.map(issue => <Issue key={issue._id} {...issue} />)}
			</ul>
		</>
	);
}
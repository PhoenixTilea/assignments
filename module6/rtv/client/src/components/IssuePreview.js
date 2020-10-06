import React from "react";
import "./styles/IssuePreview.css";

export default function IssuePreview(props) {
	return (
		<button className="issue-preview" id={props._id} onClick={() => props.openIssue(props._id)}>
			<strong>{props.title}</strong>
			<div className="votes">
				<span>{`Up: ${props.upVotes.length}`}</span>
				<span>{`Down: ${props.downVotes.length}`}</span>
			</div>
		</button>
	);
}
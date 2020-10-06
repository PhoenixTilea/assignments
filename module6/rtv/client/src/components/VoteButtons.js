import React, { useContext, useEffect, useState } from "react";
import { IssueContext } from "../context/IssueContext";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";

export default function VoteButtons(props) {
	const { user, issueId, upVotes, downVotes } = props;
	const { upVoteIssue, downVoteIssue } = useContext(IssueContext);
	const initButtonState = {disabled: true, title: "Login or create an account to vote"};
	const [up, setUp] = useState(initButtonState);
	const [down, setDown] = useState(initButtonState);
	
	useEffect(() => {
		if (!user) {
			setUp(initButtonState);
			setDown(initButtonState);
		} else if (upVotes.includes(user)) {
			setUp({disabled: false, title: "Remove up vote"});
			setDown({disabled: true, title: "Already voted"});
		} else if (downVotes.includes(user)) {
			setUp({disabled: true, title: "AlreadyVoted"});
			setDown({disabled: false, title: "Remove down vote"});
		} else {
			setUp({disabled: false, title: "Up vote"});
			setDown({disabled: false, title: "Down vote"});
		} // eslint-disable-next-line
	}, [user, upVotes, downVotes]);
	
	return (
		<div id="vote-buttons">
			<div id="up">
				<button 
					disabled={up.disabled}
					title={up.title}
					onClick={() => upVoteIssue(issueId)}
				>
					<BsArrowUp />
				</button>
				<span>{upVotes.length}</span>
			</div>
			<div id="down">
				<button 
					disabled={down.disabled}
					title={down.title}
					onClick={() => downVoteIssue(issueId)}
				>
					<BsArrowDown />
				</button>
				<span>{downVotes.length}</span>
			</div>
		</div>
	);
}
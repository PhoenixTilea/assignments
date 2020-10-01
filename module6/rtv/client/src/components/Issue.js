import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

export default function Issue(props) {
	const { user } = useContext(UserContext);
	const [vote, setVote] = useState({
		canVote: false,
		hasVote: false
	});
	const [buttonState, setButtonState] = useState({
		up: {
			disabled: true,
			title: "Login or create an account to vote"
		},
		down: {
			disabled: true,
			title: "Login or create an account to vote"
		}
	});
	
	useEffect(() => {
		let has;
		if (user.username) {
			if (user.upVotedIssues.indexOf(props._id) >= 0) {
				has = "u";
			} else if (user.downVotedIssues.indexOf(props._id) >= 0) {
				has = "d";
			} else {
				has = false;
			}
			setVote({canVote: true, hasVote: has});
		} else {
			setVote({canVote: false, hasVote: false});
		}
		// eslint-disable-next-line
	}, [user]);
	
	useEffect(() => {
		const up = {...buttonState.up};
		const down = {...buttonState.down};
		if (!vote.canVote) {
			up.disabled = true;
			up.title = "Login or create an account to vote";
			down.disabled = true;
			down.title = "Login or create an account to vote";
		} else {
			if (!vote.hasVote) {
				up.disabled = false;
				up.title = "Upvote";
				down.disabled = false;
				down.title = "Downvote";
			} else if (vote.hasVote === "u") {
				up.disabled = false;
				up.title = "Remove Upvote";
				down.disabled = true;
				down.title = "Already Voted";
			} else {
				up.disabled = true;
				up.title = "Already Voted";
				down.disabled = false;
				down.title = "Remove Downvote";
			}
		}
		setButtonState({up, down});
		// eslint-disable-next-line
	}, [vote]);
	
	const handleClick = (e) => {
		const name = e.target.name;
		switch (name) {
			case "delete":
				const del = window.confirm("Are you sure you want to delete this issue?");
				if (del) {
					props.deleteIssue(props._id);
				}
			break;
			case "up":
				props.upVote(props._id);
			break;
			case "down":
				props.downVote(props._id);
			break;
			default: break;
		}
	};
	
	return (
		<li id={props._id} className="issue">
			<h2>{props.title}</h2>
			<h3>{`Posted by ${props.author}`}</h3>
			<p>{props.description}</p>
				{(user._id === props.user) && <div className="mod-buttons">
					<button name="delete" onClick={handleClick}>Delete</button>
				</div>}
				<div className="vote">
					<div className="up">
						<span>{props.upVotes}</span>
						<button name="up" onClick={handleClick} disabled={buttonState.up.disabled} title={buttonState.up.title}>
							Up
						</button>
					</div>
					<div className="down">
						<span>{props.downVotes}</span>
						<button name="down" onClick={handleClick} disabled={buttonState.down.disabled} title={buttonState.down.title}>
							Down
						</button>
					</div>
				</div>
		</li>
	);
}
import React from "react";

export default function CommentList(props) {
	const {comments, user, deleteComment} = props;
	
	return (
		<div id="comment-list">
			{comments.map(comment => (
				<div key={comment._id} id={comment._id}>
					<p>{comment.text}</p>
					{(user === comment.user) && <button onClick={() => deleteComment(comment._id)}>Delete Comment</button>}
					<hr />
				</div>
			))}
		</div>
	);
}
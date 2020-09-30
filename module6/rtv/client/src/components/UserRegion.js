import React from "react";

export default function UserRegion(props) {
	return (
		<div role="complementary" aria-roledescription="user area" cid="user-area">
			<strong>{`Hi, ${props.name}`}</strong>
			<button onClick={props.logout}>Logout</button>
		</div>
	);
}
import React from "react";

export default function NameList(props) {
	return (
		<ol className="namelist">
		{props.names.map((name, index) => <li key={name + index}>{name}</li>)}
		</ol>
	);
}
import React, { useContext } from "react";
import { BountyContext } from "./BountyContext";
import "./BountyList.css";

export default function BountyList(props) {
	const {list, update, remove} = useContext(BountyContext);
	
	const handleClick = (e) => {
		const name = e.target.name;
		const id = e.target.parentNode.getAttribute("id");
		if (name === "delete") {
			remove(id);
		} else if (name === "living") {
			update(id, { living: false });
		} else {
			props.edit(list.find(b => b._id === id));
		}
	};
	
	return (
		<>
		<ul id="bounty-list">
		{list.map(bounty => (
			<li key={bounty._id} id={bounty._id}>
				<h2>{`${bounty.firstname} ${bounty.lastname}`}</h2>
					<h3>{bounty.type}</h3>
					<div>
						<strong>Bounty: </strong>
						<span>{`${bounty.amount} credits`}</span>
					</div>
					{bounty.living ? <button name="living" onClick={handleClick}>Living: Mark as Dead</button> 
						: <span className="dead">Dead</span>
					}
					<button name="edit" onClick={handleClick}>Edit</button>
					<button name="delete" onClick={handleClick}>Delete</button>
			</li>
		))}
		</ul>
		</>
	);
}

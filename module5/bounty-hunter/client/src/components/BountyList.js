import React, { useContext, useState } from "react";
import BountyForm from "./BountyForm";
import { BountyContext } from "./BountyContext";
import "./BountyList.css";

export default function BountyList(props) {
	const {list, add, update, remove} = useContext(BountyContext);
	const [form, setForm] = useState({
		show: false,
		data: {},
	});
	
	const handleClick = (e) => {
		const name = e.target.name;
		const id = e.target.parentNode.getAttribute("id");
		if (name === "add") {
			setForm({show: true, data: {}});
		} else if (name === "delete") {
			remove(id);
		} else if (name === "living") {
			update(id, { living: false });
		} else {
			setForm({show: true, data: list.find(b => b._id === id)});
		}
	};
	
	const submitForm = (data) => {
		if (form.data._id) {
			update(form.data._id, data);
		} else {
			add(data);
		}
		setForm({show: false, data: {}});
	};
	
	const cancelForm = () => {
		setForm({
			show: false,
			data: {}
		});
	};
	
	return (
		<>
		<div>
			<h2>Bounties</h2>
			<button name="add" onClick={handleClick}>New Bounty</button>
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
		</div>
		{form.show && 
			<div>
				<h2>{form.data._id ? "Edit Bounty" : "Add Bounty"}</h2>
				<BountyForm {...form.data} submit={submitForm} submitText={form.data._id ? "Save" : "Add"} cancel={cancelForm} />
			</div>
		}
		</>
	);
}

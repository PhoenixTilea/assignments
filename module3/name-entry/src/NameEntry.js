import React from "react";
import NameList from "./NameList";
import "./NameEntry.css";

export default class NameEntry extends React.Component {
	constructor() {
		super();
		this.state = {
			name: "",
			namelist: []
		};
		
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleChange(e) {
		this.setState({name: e.target.value});
	}
	
	handleSubmit(e) {
		e.preventDefault();
		let name = this.state.name;
		this.setState({
			name: "",
			namelist: [...this.state.namelist, name]
		});
	}
	
	render() {
		return (
			<div className="name-entry">
				<form onSubmit={this.handleSubmit}>
					<h1>{(this.state.name) ? this.state.name : "Enter a name"}</h1>
					<input type="text" value={this.state.name} placeholder="enter a name" onChange={this.handleChange} />
					<button>Add Name</button>
				</form>
				<NameList names={this.state.namelist} />
			</div>
		);
	}
}
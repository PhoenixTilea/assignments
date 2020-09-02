import React from "react";
import axios from "axios";
import Hit from "./Hit";
import "./Hitlist.css";

export default class Hitlist extends React.Component {
	constructor() {
		super();
		this.state = {
			list: []
		};
	}
	
	componentDidMount() {
		axios.get("https://raw.githubusercontent.com/VSchool/vschool-api/master/static/hitlist.json")
			.then(response => this.setState({list: response.data }));
	}
	
	render() {
		return (
			<ul className="hitlist">
	{this.state.list.map(hit => <Hit key={hit.name} name={hit.name} img={hit.image} />)}
			</ul>
		);
	}
}
import React from "react";
import Axios from "axios";
import "./Color.css";

export default class Color extends React.Component {
	constructor() {
		super();
		this.state = {
				color: "black"
		};
		this.handleClick = this.handleClick.bind(this);
	}
	
	componentDidMount() {
		this.getColor();
	}
	
	getColor() {
		Axios.get(`http://www.colr.org/json/color/random?timestamp=${new Date().getTime()}`)
			.then(response => this.setState({color: response.data.new_color }));
	}
	
	handleClick() {
		this.getColor();
	}
	
	render() {
		console.log(this.state.color);
		return (
			<button 
				className="color" 
				onClick={this.handleClick} 
				style={{backgroundColor: "#" + this.state.color}}
			>
				Click to change my color!
			</button>
		);
	}
}
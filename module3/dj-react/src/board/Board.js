import React from "react";
import ButtonPanel from "./ButtonPanel";
import Grid from "./Grid";
import "./Board.css";

const allColors = ["white", "black", "purple", "blue", "red", "green"];

export default class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			colors: ["white", "white", "white", "white"]
		};
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick(btn) {
		let colors = [...this.state.colors];
		switch (btn) {
			case 0: {
				if (colors[0] === "white") {
					colors[0] = "black";
					colors[1] = "black";
				} else {
					colors[0] = "white";
					colors[1] = "white";
				}
			}
			break;
			
			case 1: {
				colors[0] = "purple";
				colors[1] = "purple";
			}
			break;
			
			case 2: {
				colors[2] = "blue";
			}
			break;
			
			case 3: {
				colors[3] = "blue";
			}
			break;
			
			default: {
				let s = btn - 4;
				let c = allColors.indexOf(colors[s]) + 1;
				if (c === allColors.length) {
					c = 0;
				}
				colors[s] = allColors[c];
			}
		}
		this.setState({colors: colors});
	}
	
	render() {
		return (
			<div className="board">
				<Grid colors={this.state.colors} />
				<ButtonPanel onClick={this.handleClick} />
			</div>
		);
	}
}
import React from "react";
import Die from "./Die";
import "./DiceBox.css";

export default class DiceBox extends React.Component {
	constructor() {
		super();
		let dice = [];
		for (let i = 0; i < 5; i++) {
			dice.push({value: 0, selected: false });
		}
		this.state = {
			dice: dice,
			rolls: 0
		};
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick(target) {
		let dice = [...this.state.dice];
		let rolls = this.state.rolls;
		if (typeof target === "number") {
			dice[target].selected = !dice[target].selected;
		} else if (rolls === 3) {
			dice = dice.map(() => ({value: 0, selected: false }));
			rolls = 0;
		} else {
			++rolls;
			dice = dice.map(die => {
				if (!die.selected) {
					die.value = Math.round(Math.random() * 5) + 1;
				}
				return die;
			});
		}
		this.setState({dice: dice, rolls: rolls });
	}
	
	render() {
		let btnText;
		if (this.state.rolls === 3) {
			btnText = "Reset";
		} else {
			btnText = "Roll";
		}
		return (
			<div className="dicebox">
			{this.state.dice.map((die, index) => {
				return (<Die 
					key={index} 
					value={die.value} 
					selected={die.selected} 
					onClick={() => this.handleClick(index)} 
				/>);
			})}
			<button className="roll-reset" onClick={this.handleClick}>{btnText}</button>
			</div>
		);
	}
}
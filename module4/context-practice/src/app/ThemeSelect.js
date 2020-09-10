import React from "react";
import { ThemeContext } from "./ThemeContext";
import "./ThemeSelect.css";

export default class ThemeSelect extends React.PureComponent {
	static contextType = ThemeContext;
	
	constructor() {
		super();
		this.state = {selected: null };
	}
	
	componentDidMount() {
		this.setState({selected: this.context.theme});
	}
	
	handleChange = e => {
		this.setState({selected: e.target.value });
	};
	
	handleSubmit = e => {
		e.preventDefault();
		this.context.changeTheme(e.target.themeSelect.value);
	};
	
	render() {
		return (
			<form onSubmit={this.handleSubmit} className={`${this.context.theme}-theme`}>
				<select value={this.state.selected} onChange={this.handleChange} ariaLabel="theme selection" name="themeSelect">
					<option value="light">Light</option>
					<option value="dark">Dark</option>
					<option value="ocean">Ocean</option>
				</select>
				<button>Go!</button>
			</form>
		);
	}
}
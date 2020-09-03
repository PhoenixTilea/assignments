import React from "react";
import BadgeForm from "./badge/BadgeForm";
import BadgeList from "./badge/BadgeList";
import "./App.css";

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			badges: []
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleSubmit(e) {
		let form = e.target;
		let newBadge = {
			firstName: form.firstName.value,
			lastName: form.lastName.value,
			email: form.email.value,
			phone: form.phone.value,
			birthplace: form.birthplace.value,
			favFood: form.favFood.value,
			about: form.about.value
		};
		this.setState({badges: [...this.state.badges, newBadge]});
	}
	
	render() {
		return (
			<div className="app">
				<header>
					<h1>Name Badge</h1>
				</header>
				<main>
					<BadgeForm onSubmit={this.handleSubmit} />
					<hr />
					{this.state.badges.length > 0 && <BadgeList badges={this.state.badges} />}
				</main>
			</div>
		);
	}
	
}
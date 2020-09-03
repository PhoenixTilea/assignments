import React from "react";
import "./BadgeForm.css";

export default class BadgeForm extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			birthplace: "",
			favFood: "",
			about: "",
			valid: false
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	
	handleSubmit(e) {
		e.preventDefault();
		this.props.onSubmit(e);
		this.setState({
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			birthplace: "",
			favFood: "",
			about: ""
		});
	}
	
	handleChange(e) {
		let name = e.target.name;
		let valid = document.badgeForm.checkValidity();
		this.setState({
			[name] : e.target.value,
			valid: valid
		});
	}
	
	render() {
		return (
			<form name="badgeForm" className="badge-form" onSubmit={this.handleSubmit}>
				<label>
					<strong>First Name</strong>
					<input type="text" name="firstName" minLength={3} value={this.state.firstName} required={true} onChange={this.handleChange} />
				</label>
				<label>
					<strong>Last Name</strong>
					<input type="text" name="lastName" minLength={3} value={this.state.lastName} required={true} onChange={this.handleChange} />
				</label>
				<label>
					<strong>Email</strong>
					<input type="email" name="email" minLength={3} value={this.state.email} required={true} onChange={this.handleChange} />
				</label>
				<label>
					<strong>Phone</strong>
					<input type="tel" name="phone" value={this.state.phone} required={true} onChange={this.handleChange} 
						title="Enter digits only" pattern={"[0-9]{10}"}
					/>
				</label>
				<label>
					<strong>Birthplace</strong>
					<input type="text" name="birthplace" value={this.state.birthplace} minLength={3} required={true} onChange={this.handleChange} />
				</label>
				<label>
					<strong>Favorite Food</strong>
					<input type="text" name="favFood" minLength={3} value={this.state.favFood} required={true} onChange={this.handleChange} />
				</label>
				<label id="about">
					<strong>Tell us a little about yourself</strong>
					<textarea name="about" value={this.state.about} minLength={3} required={true} onChange={this.handleChange} />
				</label>
				<button disabled={!this.state.valid}>Submit</button>
			</form>
		);
	}
}
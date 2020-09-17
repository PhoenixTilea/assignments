import React from "react";
import Axios from "axios";
import Options from "./Options";
import Display from "./Display";

export default class Tracker extends React.Component {
	constructor() {
		super();
		this.state = {
			lat: null,
			long: null,
			time: null,
			countryName: "",
			localTime: true,
			cooldown: 0
		};
	}
	
	handleClick = (e) => {
		if (e.target.name === "update") {
			if (this.state.cooldown === 0) {
				this.getLocation();
			}
		} else {
			this.setState(prevState => ({localTime: !prevState.localTime}));
		}
	}
	
	// getLocation() {
		// // const params = {url: "http://api.open-notify.org/iss-now.json"};
		// Axios.get("https://vschool-cors.herokuapp.com?url=http://api.open-notify.org/iss-now.json").then(response => {
			// let coors = response.data.iss_position;
			// let time = response.data.timestamp;
			// let country = "the ocean";
			// let params = {
				// key : "3e27905d0be314",
				// lat : coors.latitude,
				// lon : coors.longitude,
				// format : "json",
				// zoom: 0
			// };
			// Axios.get(`https://us1.locationiq.com/v1/reverse.php`, {params: params}).then(geoResponse => {
				// country = geoResponse.data.address.country;
			// }).catch(error => console.log(error))
			// .finally(() => {
					// this.setState({
					// lat: coors.latitude,
					// long: coors.longitude,
					// time: time,
					// countryName: country,
					// cooldown: 5
				// });
				// this.updateCooldown();
			// });
		// }).catch(error => console.log(error));
	// }
	
	getLocation() {
		// const params = {url: "http://api.open-notify.org/iss-now.json"};
		let coors, time, country
		Axios.get("https://vschool-cors.herokuapp.com?url=http://api.open-notify.org/iss-now.json")
			.then(response => {
				coors = response.data.iss_position;
				time = response.data.timestamp;
				let params = {
					key : "3e27905d0be314",
					lat : coors.latitude,
					lon : coors.longitude,
					format : "json",
					zoom: 0
				};
				return Axios.get(`https://us1.locationiq.com/v1/reverse.php`, {params: params})
			})
			.then(
				// If the above GET works...
				geoResponse => {
					country = geoResponse.data.address.country;
				}, 
				// If the above GET doesn't work...
				err => {
					country = "the ocean"
				}
			)
			.then(() => {
				this.setState({
					lat: coors.latitude,
					long: coors.longitude,
					time: time,
					countryName: country,
					cooldown: 5
				});
				this.updateCooldown();
			})
			.catch(error => console.log(error))
	}
	
	updateCooldown() {
		let intervalId = setInterval(() => {
			this.setState(prevState => ({cooldown: prevState.cooldown - 1}));
			if (this.state.cooldown === 0) {
				clearInterval(intervalId);
			}
		}, 1000);
	}
	
	componentDidMount() {
		this.getLocation();
	}
	
	render() {
		return (
			<div className="tracker">
			<Options onClick={this.handleClick} cooldown={this.state.cooldown} localTime={this.state.localTime} />
				{this.state.lat ? <Display {...this.state} /> : <h1>Tracking...</h1>}
			</div>
		);
	}
	
}
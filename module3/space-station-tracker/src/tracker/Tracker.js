import React from "react";
import Axios from "axios";
import Options from "./Options";
import Display from "./Display";
import "./Tracker.css";

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
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick(e) {
		let name = e.target.name;
		switch (name) {
			case "update": {
				if (this.state.cooldown === 0) {
					this.getLocation();
				}
			}
			break;
			
			case "time": {
				this.setState({localTime: !this.state.localTime});
			}
			break;
		}
	}
	
	getLocation() {
		Axios.get("http://api.open-notify.org/iss-now.json").then(response => {
			let coors = response.data.iss_position;
			let time = response.data.timestamp;
			let country = "the ocean";
			let params = {
				key : "3e27905d0be314",
				lat : coors.latitude,
				lon : coors.longitude,
				format : "json",
				zoom: 0
			};
			Axios.get(`https://us1.locationiq.com/v1/reverse.php`, {params: params}).then(geoResponse => {
				country = geoResponse.data.address.country;
			}).catch(error => console.log(error))
			.finally(() => {
					this.setState({
					lat: coors.latitude,
					long: coors.longitude,
					time: time,
					countryName: country,
					cooldown: 15
				});
				this.updateCooldown();
			});
		}).catch(error => console.log(error));
	}
	
	updateCooldown() {
		let intervalId = setInterval(() => {
			this.setState({cooldown: this.state.cooldown - 1});
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
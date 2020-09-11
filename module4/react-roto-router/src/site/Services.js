import React from "react";
import Service from "./Service";

export default function Services() {
	return (
		<>
			<h1>Our Services</h1>
			<ul className="service-list">
			{services.map(service => <Service key={service.name} {...service} />)}
			</ul>
		</>
	);
}

const services = [
	{
		name: "Checkup",
		desc: "We'll plush your pipes and give everything a good look-over for any potential problems.",
		price: 300
	},
	{
		name: "Septic Tank Drain",
		desc: "Just what it says on the tin: We'll bring out the poop truck and empty your septic tank.",
		price: 200
	},
	{
		name: "Winterize",
		desc: "We'll make sure your entire plumbing system can stand up to the coldest winter nights. You might be lonely, but the faucets will work!",
		price: 1000
	},
	{
		name: "Repair",
		desc: "Got a busted pipe? Not anymore!",
		price: 500
	}
]
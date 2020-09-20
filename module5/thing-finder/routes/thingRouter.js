const express = require("express");
const uniqid = require("uniqid");
const { things } = require("../data.json");

const thingRouter = express.Router();
thingRouter.route("/")
.get((req, res) => {
	const found = things.filter(thing => {
		for (let key in req.query) {
			if (key === "type" && thing.type !== req.query.type) {
				return false;
			} else if (key === "minprice" && thing.price < req.query.minprice) {
				return false;
			} else if (key === "maxprice" && thing.price > req.query.maxprice) {
				return false;
			}
		}
		return true;
	});
	res.send(found);
});

module.exports = thingRouter;
const express = require("express");
const Bounty = require("../models/Bounty");



const bountyRouter = express.Router();
bountyRouter.route("/")
.get((req, res) => {
	Bounty.find((err, bounties, next) => {
		if (err) {
			res.status(500);
			return next(err);
		} else {
			return res.status(200).send(bounties);
		}
	});
})
.post((req, res, next) => {
	const newBounty = new Bounty(req.body);
	newBounty.save((err, bounty) => {
		if (err) {
			res.status(500);
			return next(err);
		} else {
			return res.status(201).send(bounty);
		}
	});
});

bountyRouter.route("/:id")
.get((req, res) => {
	Bounty.findOne({_id: req.params.id}, (err, bounty) => {
		if (err) {
			res.status(500);
			return next(err);
		} else {
			return res.status(200).send(bounty);
		}
	});
})
.put((req, res) => {
	Bounty.findOneAndUpdate({_id: req.params.id}, req.body, {new: true},
	(err, bounty) => {
		if (err) {
			res.status(500);
			return next(err);
		} else {
			return res.status(202).send(bounty);
		}
	});
})
.delete((req, res) => {
	Bounty.findOneAndDelete({_id: req.params.id}, (err, bounty) => {
		if (err) {
			res.status(500);
			return next(err);
		} else {
			return res.status(203).send(`${bounty.firstname} ${bounty.lastname} has been deleted`);
		}
	});
});

module.exports = bountyRouter;
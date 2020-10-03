const express = require("express");
const Issue = require("../models/Issue");

const issueRouter = express.Router();

// Get all issues
issueRouter.get("/", (req, res, next) => {
	const filters = {};
	if (req.query) {
		if (req.query.user) {
			filters.user = req.query.user;
		}
	}
	Issue.find(filters, null, {$sort: {upVotes: -1, postDate: -1}}, (err, issues) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		return res.status(200).send(issues);
	});
});

module.exports = issueRouter;
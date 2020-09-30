const express = require("express");
const Issue = require("../models/Issue");

const issueRouter = express.Router();

// Get all issues
issueRouter.get("/", (req, res, next) => {
	Issue.find((err, issues) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		issues.sort((a, b) => {
			let v = a.upVotes - b.upVotes;
			if (v !== 0) {
				return v;
			}
			if (a.postDate < b.postDate) {
				return -1;
			} else if (a.postDate > b.postDate) {
				return 1;
			}
			return 0;
		});
		return res.status(200).send(issues);
	});
});

module.exports = issueRouter;
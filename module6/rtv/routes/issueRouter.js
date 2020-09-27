const express = require("express");
const Issue = require("../model/Issue");
const Comment = require("../models/Comment");

const issueRouter = express.Router();

// Get all issues
issueRouter.get("/", (req, res, next) => {
	Issue.find((err, issues) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		return res.status(200).send(issues);
	});
});
issueRouter.get("/:issueId"), (req, res, next) => {
	Issue.findOne({_id: req.params.issueId}, (err, issue) => {
		if (err) {
			res.status(500);
			return next(err);
		} else if (!issue) {
			res.status(404);
			return next(err);
		}
		return res.status(200).send(issue);
	});
});

// Protected Routes
issueRouter.post("/protected", (req, res, next) => {
	req.body.user = req.user._id;
	const newIssue = new Issue(req.body);
	newIssue.save((err, saved) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		return res.status(201).send(saved);
	});
});

// Update and delete
issueRouter.route("/protected/issueId")
.put((req, res, next) => {
	Issue.findOneAndUpdate({_id: req.params.issueId}, req.body, {new: true},
	(err, issue) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		return res.status(202).send(issue);
	});
});
.delete((req, res, next) => {
	Issue.findOneAndDelete({_id: req.params.issueId}, (err, issue) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		Comment.findAndDelete({issue: issue._id}, (err, comments) => {
			if (err) {
				res.status(500);
				return next(err);
			}
		return res.status(203).send({message: `${issue.title} was deleted.`});
		});
	});
});

module.exports = issueRouter;
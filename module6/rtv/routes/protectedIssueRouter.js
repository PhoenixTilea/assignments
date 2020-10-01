const express = require("express");
const User = require("../models/User");
const Issue = require("../models/Issue");
const Comment = require("../models/Comment");

const issueRouter = express.Router();
// Protected Routes
issueRouter.route("/")
.get((req, res, next) => {
	Issue.find({user: req.user._id}, (err, issues) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		res.status(200).send(issues);
	});
})
.post((req, res, next) => {
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
issueRouter.route("/:issueId")
.put((req, res, next) => {
	Issue.findOneAndUpdate({_id: req.params.issueId, user: req.user._id}, req.body, {new: true},
	(err, issue) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		return res.status(202).send(issue);
	});
})
.delete((req, res, next) => {
	Issue.findOneAndDelete({_id: req.params.issueId, user: req.user._id}, (err, issue) => {
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

// Voting
issueRouter.put("/upvote/:issueId", (req, res, next) => {
	const user = User.findOne({_id: req.user._id}, (err, user) => {
		if (err) {
			res.status(500);
			return next(err);
		} else if (!user) {
			res.status(404);
			return next(new Error("User not found."));
		}
		const {issueId} = req.params;
		const inc = (user.upVotedIssues.includes(issueId)) ? -1 : 1;
		if (inc === 1) {
			user.upVotedIssues.addToSet(issueId);
		} else {
			user.upVotedIssues.pull(issueId);
		}
		Issue.findOneAndUpdate({_id: issueId}, {$inc: {upVotes: inc}}, {new: true}, (err, issue) => {
			if (err) {
				res.status(500);
				return next(err);
			} else if (!issue) {
				res.status(404);
				return next(new Error("Issue not found."));
			}
			res.status(202).send(issue);
		});
	});
});
issueRouter.put("/downvote/:issueId", (req, res, next) => {
	
});

module.exports = issueRouter;
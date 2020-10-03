const express = require("express");
const User = require("../models/User");
const Issue = require("../models/Issue");
const Comment = require("../models/Comment");

const issueRouter = express.Router();

issueRouter.post("/", (req, res, next) => {
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
	Issue.findByIdAndUpdate(req.params.issueId, req.body, {new: true}, (err, issue) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		return res.status(200).send(issue);
	});
})
.delete((req, res, next) => {
	Issue.findByIdAndDelete(req.params.issueId, (err, issue) => {
		if (err) {
			res.status(500);
			return next(err);
		} else if (!issue) {
			res.status(404);
			return next(new Error("Issue not found."));
		}
		Comment.deleteMany({issue: issue._id}, (err, comments) => {
			if (err) {
				res.status(500);
				return next(err);
			}
		return res.status(200).send({message: `${issue.title} was deleted.`});
		});
	});
});

// Voting
issueRouter.put("/upvote/:issueId", (req, res, next) => {
	const user = req.user;
	const issueId = req.params.issueId;
	let inc;
	let voteMod;
	if (user.upVotedIssues.includes(issueId)) {
		inc = {$inc: {upVotes: -1}};
		voteMod = {$pull: {upVotedIssues: issueId}};
	} else {
		inc = {$inc: {upVotes: 1}};
		voteMod = {$push: {upVotedIssues: issueId}};
	}
	User.findByIdAndUpdate(user._id, null, voteMod, (err, upUser) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		Issue.findByIdAndUpdate(issueId, null, inc, (err, upIssue) => {
			if (err) {
				res.status(500);
				return next(err);
			}
			return res.status(200).send({user: upUser.withoutPassword(), issue: upIssue});
		});
	});
});

issueRouter.put("/downvote/:issueId", (req, res, next) => {
	const user = req.user;
	const issueId = req.params.issueId;
	let inc;
	let voteMod;
	if (user.downVotedIssues.includes(issueId)) {
		inc = {$inc: {downVotes: -1}};
		voteMod = {$pull: {downVotedIssues: issueId}};
	} else {
		inc = {$inc: {downVotes: 1}};
		voteMod = {$push: {downVotedIssues: issueId}};
	}
	User.findByIdAndUpdate(user._id, voteMod, (err, downUser) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		Issue.findByIdAndUpdate(issueId, inc, {new: true}, (err, downIssue) => {
			if (err) {
				res.status(500);
				return next(err);
			}
			return res.status(200).send({user: downUser.withoutPassword(), issue: downIssue});
		});
	});
});

module.exports = issueRouter;
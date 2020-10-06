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
	const user = req.user._id;
	Issue.findById(req.params.issueId, (err, issue) => {
		if (err) {
			res.status(500);
			return next(err);
		} else if (!issue) {
			res.status(404);
			return next(new Error("Issue not found."));
		}
		if (issue.upVotes.includes(user)) {
			issue.upVotes.pull(user);
		} else {
			issue.upVotes.addToSet(user);
		}
		issue.save((err, savedIssue) => {
			if (err) {
				res.status(500);
				return next(err);
			}
			return res.status(200).send(savedIssue);
		});
	});
});
issueRouter.put("/downvote/:issueId", (req, res, next) => {
	const user = req.user._id;
	Issue.findById(req.params.issueId, (err, issue) => {
		if (err) {
			res.status(500);
			return next(err);
		} else if (!issue) {
			res.status(404);
			return next(new Error("Issue not found."));
		}
		if (issue.downVotes.includes(user)) {
			issue.downVotes.pull(user);
		} else {
			issue.downVotes.addToSet(user);
		}
		issue.save((err, savedIssue) => {
			if (err) {
				res.status(500);
				return next(err);
			}
			return res.status(200).send(savedIssue);
		});
	});
});

module.exports = issueRouter;
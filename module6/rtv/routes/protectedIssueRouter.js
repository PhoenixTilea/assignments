const express = require("express");
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
	const user = req.user;
	const id = req.params.issueId;
	const inc = (user.upVotedIssues.indexOf(id) < 0) ? 1 : -1;
	Issue.findOneAndUpdate({_id: id}, {$inc : {upVotes: inc}}, {new: true}, (err, issue) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		if (inc === -1) {
			User.findOneAndUpdate({_id: user._id}, { $pull : { upVotedIssues: id}}, {new: true}, (err, user) => {
				if (err) {
					res.status(500);
					return next(err);
				}
			return res.status(202).send(user: user.withoutPassword(), issue});
			});
		} else {
			User.findOneAndUpdate({_id: user._id}, { $push : { upVotedIssues: id}}, {new: true}, (err, user) => {
				if (err) {
					res.status(500);
					return next(err);
				}
			return res.status(202).send(user: user.withoutPassword(), issue});
			});
		}
	});
});
issueRouter.put("/downvote/:issueId", (req, res, next) => {
	const user = req.user;
	const id = req.params.issueId;
	const inc = (user.downVotedIssues.indexOf(id) < 0) ? 1 : -1;
	Issue.findOneAndUpdate({_id: id}, {$inc : {downVotes: inc}}, {new: true}, (err, issue) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		if (inc === -1) {
			User.findOneAndUpdate({_id: user._id}, { $pull : { downVotedIssues: id}}, {new: true}, (err, user) => {
				if (err) {
					res.status(500);
					return next(err);
				}
			return res.status(202).send(user: user.withoutPassword(), issue});
			});
		} else {
			User.findOneAndUpdate({_id: user._id}, { $push : { downVotedIssues: id}}, {new: true}, (err, user) => {
				if (err) {
					res.status(500);
					return next(err);
				}
			return res.status(202).send(user: user.withoutPassword(), issue});
			});
		}
	});
});

module.exports = issueRouter;
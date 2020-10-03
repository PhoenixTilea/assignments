const express = require("express");
const Comment = require("../models/Comment");

const commentRouter = express.Router();
commentRouter.get("/:issueId", (req, res, next) => {
	Comment.find({issue: req.params.issueId}, null, {$sort: {postDate: 1}}, (err, comments) => {
		if (err) {
			res.status(500);
			return next(err);
		}
	res.status(200).send(comments);
});

module.exports = commentRouter;
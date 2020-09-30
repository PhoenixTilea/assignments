const express = require("express");
const Comment = require("../models/Comment");

const commentRouter = express.Router();
commentRouter.get("/:issueId", (req, res, next) => {
	Comment.find({issue: req.params.issueId}, (err, comments) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		comments.sort((a, b) => {
			if (a.postData < b.postData) {
				return -1;
			} else if (a.postData > b.postDate) {
				return 1;
			}
			return 0;
		});
	});
	res.status(200).send(comments);
});

module.exports = commentRouter;
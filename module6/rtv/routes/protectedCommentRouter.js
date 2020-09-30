const express = require("express");
const Comment = require("../models/Comment");

const commentRouter = express.Router();

// protected routes
commentRouter.post("/:issueId", (req, res, next) => {
	req.body.user = req.user._id;
	req.body.issue = req.params.issueId;
	const newComment = new Comment(req.body);
	newComment.save((err, comment) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		res.status(201).send(comment);
	});
});

commentRouter.route("/:commentId")
.put((req, res, next) => {
	Comment.findOneAndUpdate({_id: req.params.commentId, user: req.user._id}, req.body, {new: true}, (err, comment) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		return res.status(202).send(comment);
	});
})
.delete((req, res, next) => {
	Comment.findOneAndDelete({_id: req.params.commentId, user: req.user._id}, (err, comment) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		return res.status(203).send({message: "Comment was successfully deleted."});
	});
});

module.exports = commentRouter;
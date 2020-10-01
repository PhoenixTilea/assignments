const express = require("express");
const User = require("../models/User");

const userRouter = express.Router();
userRouter.get("/:userId", (req, res, next) => {
	User.findOne({_id: req.params.userId}, (err, user) => {
		if (err) {
			res.status(500);
			return next(err);
		} else if (!user) {
			res.status(404);
			return next(new Error("User not found."));
		}
		return res.status(200).send({_id: user._id, username: user.username});
	});
});

module.exports = userRouter;
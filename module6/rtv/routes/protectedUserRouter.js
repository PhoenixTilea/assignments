const express = require("express");
const User = require("../models/User");

const userRouter = express.Router();
userRouter.get("/", (req, res, next) => {
	User.findOne({_id: req.user._id}, (err, user) => {
		if (err) {
			res.status(500);
			return next(err);
		} else if (!user) {
			res.status(404);
			return next(new Error("User not found."));
		}
		return res.status(200).send(user.withoutPassword());
	});
});

module.exports = userRouter;
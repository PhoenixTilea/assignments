const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authRouter = express.Router();
authRouter.post("/signup", (req, res, next) => {
	User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
		if (err) {
			res.status(500);
			return next(err);
		} else if (user) {
			res.status(403);
			return next(new Error("Sorry. That username is unavailable."));
		}
		const newUser = new User(req.body);
		newUser.save((err, saved) => {
			if (err) {
				res.status(500);
				return next(err);
			}
			const token = jwt.sign(saved.withoutPassword(), process.env.SECRET);
			return res.status(201).send({user: saved.withoutPassword(), token});
		});
	});
});

authRouter.post("/login", (req, res, next) => {
	const error = new Error("Username or password is incorrect.");
	User.findOne({username: req.body.username}, (err, user) => {
		if (err) {
			res.status(500);
			return next(err);
		} else if (!user) {
			res.status(404);
			return next(error);
		}
		user.checkPassword(req.body.password, (err, isMatch) => {
			if (err) {
				res.status(500);
				return next(err);
			} else if (!isMatch) {
				res.status(404);
				return next(error);
			}
			const token = jwt.sign(user.withoutPassword(), process.env.SECRET);
			return res.status(201).send({user: user.withoutPassword(), token});
		});
	});
});

module.exports = authRouter;
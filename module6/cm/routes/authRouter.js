const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authRouter = express.Router();

authRouter.post("/signup", (req, res, next) => {
	User.find({username: req.body.username}, (err, user) => {
		if (err) {
			res.status(500);
			return next(err);
		} else if (user) {
			res.status(403);
			return next(new Error("Sorry, that username is unavailable."));
		}
		const newUser = new User(req.body);
		newUser.save((err, savedUser) => {
			if (err) {
				res.status(500);
				return next(err);
			}
			const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET);
			return res.status(201).send({user: savedUser.withoutPassword(), token});
		});
	});
});

authRouter.post("/login", (req, res, next) => {
	const creds = req.body;
	User.findOne({username: creds.username}, (err, user) => {
		if (err) {
			res.status(500);
			return next(err);
		} else if (!user) {
			res.status(404);
			return next(new Error("Username or password is incorrect."));
		}
		user.checkPassword(creds.password, (err, isMatch) => {
			if (err) {
				res.status(500);
				return next(err);
			} else if (!isMatch) {
				res.status(404);
				return next(new Error("Username or password is incorrect."));
			}
			const token = jwt.sign(user.withoutPassword(), process.env.SECRET);
			return res.status(201).send({user: user.withoutPassword(), token});
		});
	});
});

module.exports = authRouter;
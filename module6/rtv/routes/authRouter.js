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
			return next(new Error("Sorry. That username already exists."));
		} else {
			const newUser = new User(req.body);
			newUser.save((err, saved) => {
				if (err) {
					res.status(500);
					return next(err);
				} else {
					const token = jwt.sign(saved.withoutPassword(), process.env.SECRET);
					res.status(201).send({user: saved.withoutPassword(), token: token});
				}
			});
		}
	});
});

authRouter.post("/login", (req, res, next) => {
	User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
		if (err) {
			res.status(500);
			return next(err);
		} else if (!user) {
			res.status(403);
			return next(new Error("Username or password is incorrect."));
		}
		user.checkPassword(req.body.password, (err, isMatch) => {
			if (err) {
				res.status(500);
				return next(err);
			} else if (!isMatch) {
				res.status(403);
				return next(new Error("Username or password is incorrect."));
			}
			const token = jwt.sign(user.withoutPassword(), process.env.SECRET);
			res.status(200).send({user: user.withoutPassword(), token});
		});
	});
});

module.exports = authRouter;
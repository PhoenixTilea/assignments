const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authRouter = express.Router();
authRouter.route("/signup")
.post((req, res, next) => {
	User.findOne({username: req.body.username}, (err, user) => {
		if (err) {
			res.status(500);
			return next(err);
		} else if (user) {
			res.status(403);
			return next(new Error("That username already exists"));
		} else {
			req.body.username = req.body.username.toLowerCase();
			const newUser = new User(req.body);
			newUser.save((err, savedUser) => {
				if (err) {
					res.status(500);
					return next(err);
				} else {
					const token = jwt.sign(savedUser.toObject(), process.env.SECRET);
					return res.status(201).send({token: token, user: savedUser});
				}
			});
		}
	});
});

authRouter.route("/login")
.post((req, res, next) => {
	User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
		if (err) {
			res.status(500);
			return next(err);
		} else if (!user || req.body.password !== user.password) {
			res.status(403);
			return next(new Error("Username or password is incorrect."));
		} else {
			const token = jwt.sign(user.toObject(), process.env.SECRET);
			res.status(200).send({token: token, user: user});
		}
	});
});

module.exports = authRouter;
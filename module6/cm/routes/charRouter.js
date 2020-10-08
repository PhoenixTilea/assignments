const express = require("express");
const Character = require("../models/Character");
const Campaign = require("../models/Campaign");

const charRouter = express.Router();
charRouter.route("/")
.get((req, res, next) => {
	const user = req.user._id;
	Character.find({user: user}, (err, chars) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		return res.status(200).send(chars);
	});
})
.post((req, res, next) => {
	req.body.user = req.user._id;
	const newChar = new Character(req.body);
	newChar.save((err, savedChar) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		return res.status(201).send(savedChar);
	});
});

charRouter.route("/:charId")
.get((req, res, next) => {
	const {charId} = req.params;
	const user = req.user._id;
	Character.findOne({_id: charId, user: user}, (err, character) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		return res.status(200).send(character);
	});
})
.put((req, res, next) => {
	const user = req.user._id;
	Character.findOneAndUpdate({_id: req.params.charId, user: user}, req.body, {new: true}, (err, character) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		return res.status(200).send(character);
	});
})
.delete((req, res, next) => {
	const user = req.user._id;
	Character.findOneAndDelete({_id: req.params.charId, user: user}, (err, character) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		return res.status(200).send({message: "Success!"});
	});
});

module.exports = charRouter;
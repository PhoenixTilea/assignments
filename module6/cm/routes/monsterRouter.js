const express = require("express");
const Monster = require("../models/Monster");

const monsterRouter = express.Router();
monsterRouter.route("/")
.get((req, res, next) => {
	const user = req.user._id;
	Monster.find({user}, (err, monsters) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		return res.status(200).send(monsters);
	});
})
.post((req, res, next) => {
	req.body.user = req.user._id;
	const newMonster = new Monster(req.body);
	newMonster.save((err, savedMonster) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		return res.status(201).send(savedMonster);
	});
});

monsterRouter.route("/:monId")
.get((req, res, next) => {
	const {monId} = req.params;
	const user = req.user._id;
	Monster.findOne({_id: monId, user}, (err, monster) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		return res.status(200).send(monster);
	});
})
.put((req, res, next) => {
	const {monId} = req.params;
	const user = req.user._id;
	Monster.findOneAndUpdate({_id: monId, user}, req.body, {new: true}, (err, monster) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		return res.status(200).send(monster);
	});
})
.delete((req, res, next) => {
	const {monId} = req.params;
	const user = req.user._id;
	Monster.findOneAndDelete({_id: monId, user}, (err, monster) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		return res.status(200).send({message: "Success!"});
	});
});

module.exports = monsterRouter;
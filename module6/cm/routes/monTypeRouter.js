const express = require("express");
const Monstertype = require("../models/MonsterType");

const monTypeRouter = express.Router();

monTypeRouter.route("/")
.get((req, res, next) => {
	const user = req.user._id;
	MonsterType.find({user: user}, (err, types) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		return res.status(200).send(types);
	});
})
.post((req, res, next) => {
	req.body.user = req.user._id;
	const newType = new MonsterType(req.body);
	newType.save((err, savedType) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		return res.status(201).send(savedType);
	});
});

monTypeRouter.route("/:typeId")
.get((req, res, next) => {
	const user = req.user._id;
	const {typeId} = req.params;
	MonsterType.findOne({_id: typeId, user}, (err, type) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		return res.status(200).send(type);
	});
})
.put((req, res, next) => {
	const user = req.user._id;
	const {typeId} = req.params;
	MonsterType.findOneAndUpdate({_id: typeId, user}, req.body, {new: true}, (err, type) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		return res.status(200).send(type);
	});
})
.delete((req, res, next) => {
	const user = req.user._id;
	const {typeId} = req.params;
	MonsterType.findOneAndDelete({_id: typeId, user}, (err, type) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		return res.status(200).send({message: "Success!"});
	});
});


module.exports = monTypeRouter;
const express = require("express");
const Item = require("../models/Item");

const itemRouter = express.Router();

itemRouter.route("/")
.get((req, res, next) => {
	req.query = req.query || {};
	Item.find(req.query, (err, items) => {
		if (err) {
			res.status(500);
			return next(err);
		} else {
			return res.status(200).send(items);
		}
	});
})
.post((req, res, next) => {
	const newItem = new Item(req.body);
	newItem.save((err, item) => {
		if (err) {
			res.status(500);
			return next(err);
		} else {
			return res.status(201).send(item);
		}
	});
});

itemRouter.route("/:id")
.get((req, res, next) => {
	Item.findOne({_id: req.params.id}, (err, item) => {
		if (err) {
			res.status(500);
			return next(err);
		} else {
			return res.status(200).send(item);
		}
	});
})
.put((req, res, next) => {
	Item.findOneAndUpdate({_id: req.params.id}, req.body, {new: true},
	(err, item) => {
		if (err) {
			res.status(500);
			return next(err);
		} else {
			return res.status(202).send(item);
		}
	});
})
.delete((req, res, next) => {
	Item.findOneAndDelete({_id: req.params.id}, (err, item) => {
		if (err) {
			res.status(500);
			return next(err);
		} else {
			return res.status(203).send(`${item.name} was deleted successfully`);
		}
	});
});

module.exports = itemRouter;
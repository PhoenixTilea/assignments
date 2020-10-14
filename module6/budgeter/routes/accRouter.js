const express = require("express");
const Account = require("../models/Account");

const accRouter = express.Router();
accRouter.route("/")
.get((req, res, next) => {
	const user = req.user._id;
	Account.find({user}, (err, accounts) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		return res.send(accounts);
	});
})
.post((req, res, next) => {
	const acc = req.body;
	acc.user = req.user._id;
	const newAcc = new Account(acc);
	newAcc.save((err, savedAcc) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		return res.status(201).send(savedAcc);
	});
});

accRouter.route("/:accId")
.get((req, res, next) => {
	const user = req.user._id;
	const {accId} = req.params;
	Account.findOne({_id: accId, user}, (err, account) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		return res.send(account);
	});
})
.put((req, res, next) => {
	const user = req.user._id;
	const {accId} = req.params;
	Account.findOneAndUpdate({_id: accId, user}, req.body, {new: true}, (err, account) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		return res.send(account);
	});
})
.delete((req, res, next) => {
	const user = req.user._id;
	const {accId} = req.params;
	Account.findOneAndDelete({_id: accId, user}, (err, account) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		return res.send({message: `${account.name} has been deleted.`});
	});
});

module.exports = accRouter;
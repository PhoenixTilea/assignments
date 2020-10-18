const express = require("express");
const Account = require("../models/Account");

const transRouter = express.Router();

transRouter.post("/:accId", (req, res, next) => {
	Account.findOne({_id: req.params.accId, user: req.user._id}, (err, account) => {
		if (err) {
			res.status(500);
			return next(err);
		} else if (!account) {
			res.status(404);
			return next(new Error("Account not found."));
		}
		const tr = account.transactions.create(req.body);
		account.balance += tr.amount;
		account.transactions.addToSet(tr);
		account.transactions.sort((tr1, tr2) => {
			if (tr1.date < tr2.date) {
				return 1;
			}
			return -1;
		});
		account.save((err, saved) => {
			if (err) {
				res.status(500);
				return next(err);
			}
			return res.status(201).send(saved);
		});
	});
});

transRouter.route("/:accId/:transId")
.put((req, res, next) => {
	Account.findOne({_id: req.params.accId, user: req.user._id}, (err, account) => {
		if (err) {
			res.status(500);
			return next(err);
		} else if (!account) {
			res.status(404);
			return next(new Error("Account not found."));
		}
		const tr = account.transactions.id(req.params.transId);
		if (req.body.amount) {
			account.balance += req.body.amount - tr.amount;
		}
		tr.set(req.body);
		if (req.body.date) {
			account.transactions.sort((tr1, tr2) => {
				if (tr1.date < tr2.date) {
					return 1;
				}
				return -1;
			});
		}
		account.save((err, saved) => {
			if (err) {
				res.status(500);
				return next(err);
			}
			return res.send(saved);
		});
	});
})
.delete((req, res, next) => {
	Account.findOne({_id: req.params.accId, user: req.user._id}, (err, account) => {
		if (err) {
			res.status(500);
			return next(err);
		} else if (!account) {
			res.status(404);
			return next(new Error("Account not found>"));
		}
		const tr = account.transactions.id(req.params.transId);
		account.balance -= tr.amount;
		tr.remove();
		account.save((err, saved) => {
			if (err) {
				res.status(500);
				return next(err);
			}
			return res.send(saved);
		});
	});
});

module.exports = transRouter;
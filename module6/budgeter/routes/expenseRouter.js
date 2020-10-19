const express = require("express");
const Expense = require("../models/IncomeExpense");

const expenseRouter = express.Router();
expenseRouter.route("/")
.get((req, res, next) => {
	Expense.find({user: req.user._id}, null, {$sort: {due: 1}}, (err, exps) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		return res.send(exps);
	});
})
.post((req, res, next) => {
	req.body.user = req.user._id;
	const newExp = new Expense(req.body);
	newExp.save((err, saved) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		return res.status(201).send(saved);
	});
});

expenseRouter.route("/:expId")
.put((req, res, next) => {
	Expense.findOneAndUpdate({_id: req.params.expId, user: req.user._id}, req.body, {new: true}, (err, exp) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		return res.send(exp);
	});
})
.delete((req, res, next) => {
	Expense.findOneAndDelete({_id: req.params.expId, user: req.user._id}, (err, exp) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		return res.send({message: "Expense deleted.", exp });
	});
});

module.exports = expenseRouter;
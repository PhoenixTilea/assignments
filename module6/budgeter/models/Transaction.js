const { Schema } = require("mongoose");

const transSchema = new Schema({
	amount: {
		type: Number,
		required: true
	},
	toAccount: {
		type: Schema.Types.ObjectId,
		ref: "Account"
	},
	forExpense: {
		type: Schema.Types.ObjectId,
		ref: "Expense"
	},
	date: {
		type: Date,
		default: Date.now(),
		required: true
	},
	category: {
		type: String,
		default: "Misc"
	},
	notes: String
});

module.exports = transSchema;
const mongoose = require("mongoose");
const {Schema} = mongoose;

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
	category: String,
	subcategory: String,
	notes: String
});

const accountSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	debt: {
		type: Boolean,
		default: false
	},
	type: {
		type: String,
		default: "other"
	},
	balance: {
		type: Number,
		required: true,
		default: 0
	},
	limit: {
		type: Number,
		min: 0
	},
	transactions: [transSchema]
});

module.exports = mongoose.model("Account", accountSchema);
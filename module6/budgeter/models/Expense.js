const mongoose = require("mongoose");
const {Schema} = mongoose;

const expenseSchema = new Schema({
	amount: {
		type: Number,
		required: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	due: {
		type: Date,
		required: true
	},
	category: String,
	subcategory: String,
	notes: String
});

module.exports = mongoose.model("Expense", expenseSchema);
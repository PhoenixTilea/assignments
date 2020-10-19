const mongoose = require("mongoose");
const {Schema} = mongoose;
const renewal = require("./Renewal");

const incomeSchema = new Schema({
	amount: {
		type: Number,
		required: true,
		min: 0.01
	},
	due: {
		type: Date,
		required: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	account: {
		type: Schema.Types.ObjectId,
		"ref": "Account",
		required: true
	},
	auto: Boolean,
	autorenew: renewal,
	category: {
		type: String,
		default: "Misc"
	},
	notes: String
});

module.exports = mongoose.model("Income", incomeSchema);
const mongoose = require("mongoose");

const interestSchema = new mongoose.Schema({
	rate: {
		type: Number,
		required: true,
		default: 0
	},
	appliedOn: {
		type: {
			day: Number,
			month: Number
		},
		required: true,
		default: {day: 1}
	},
	lastAppliedOn: {
		type: Date,
		required: true,
		default: Date.now()
	}
});

module.exports = mongoose.model("Interest", interestSchema);
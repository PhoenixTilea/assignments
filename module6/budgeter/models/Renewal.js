const mongoose = require("mongoose");

const renewalSchema = new mongoose.Schema({
	every: {
		type: {
			num: {
				type: Number,
				required: true,
				min: 1,
				default: 1
			},
			span: {
				type: String,
				required: true
			}
		},
		required: true
	},
	onDay : {
		type: {
			weekDay: Number,
			day: Number,
			month: Number
		}
	}
});

module.exports = renewalSchema;
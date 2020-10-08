const mongoose = require("mongoose");
const {Schema} = mongoose;

const characterSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	campaign: {
		type: Schema.Types.ObjectId,
		ref: "Campaign",
		default: null
	},
	active: {
		type: Boolean,
		default: false,
		required: true
	},
	ac: {
		type: Number,
		required: true
	},
	maxHp: {
		type: Number,
		required: true,
		min: 1
	},
	hp: {
		type: Number,
		required: true,
		min: 0
	},
	tempHp: {
		type: Number,
		required: true,
		default: 0
	},
	initiative: {
		type: Number,
		default: 0
	}
});

module.exports = mongoose.model("Character", characterSchema);
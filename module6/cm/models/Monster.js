const mongoose = require("mongoose");
const {Schema} = mongoose;

const monsterSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	ac: {
		type: Number,
		required: true
	},
	maxHp: {
		type: Number,
		min: 1,
		required: true
	},
	hp: {
		type: Number,
		min: 0,
		required: true
	},
	tempHp: {
		type: Number,
		default: 0,
		required: true
	},
	initiative: {
		type: Number,
		default: 0
	},
	deleteOnDeath: {
		type: Boolean,
		default: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true
	}
});

module.exports = mongoose.model("Monster", monsterSchema);
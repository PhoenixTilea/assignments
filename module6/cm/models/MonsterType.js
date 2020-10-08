const mongoose = require("mongoose");
const {Schema} = mongoose;

const monsterTypeSchema = new Schema({
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
		required: true,
		min: 1
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true
	}
});

module.exports = mongoose.model("MonsterType", monsterTypeSchema);
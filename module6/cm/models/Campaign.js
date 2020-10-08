const mongoose = require("mongoose");
const {Schema} = mongoose;

const campaignSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	dm: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	players: {
		type: [{
			type: Schema.Types.ObjectId,
			ref: "User"
		}],
		default: []
	}
});

module.exports = mongoose.model("Campaign", campaignSchema);
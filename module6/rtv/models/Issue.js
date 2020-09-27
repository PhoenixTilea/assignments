const mongoose = require("mongoose");
const {Schema} = mongoose;
const issueSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	upVotes: {
		type: Number,
		default: 0
	},
	downVotes: {
		type: Number,
		default: 0
	}
});

module.exports = mongoose.model("Issue", issueSchema);
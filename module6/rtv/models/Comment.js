const mongoose = require("mongoose");
const {Schema} = mongoose;
const commentSchema = new Schema({
	text: {
		type: String,
		required: true
	},
	postDate: {
		type: Date,
		default: Date.now()
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	issue: {
		type: Schema.Types.ObjectId,
		ref: "Issue",
		required: true
	}
});

module.exports = mongoose.model("Comment", commentSchema);
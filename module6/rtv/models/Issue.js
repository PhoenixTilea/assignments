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
	postDate: {
		type: Date,
		default: Date.now()
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	upVotes: {
		type : [{
			type: Schema.Types.ObjectId,
			ref: "User"
		}],
		default: []
	},
	downVotes: {
		type : [{
			type: Schema.Types.ObjectId,
			ref: "User"
		}],
		default: []
	}
});

module.exports = mongoose.model("Issue", issueSchema);
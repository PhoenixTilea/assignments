const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {type: String, required: true, lower: true, unique: true},
	password: {type: String, required: true},
	memberSince: {type: Date, default: Date.now()},
	isAdmin: {type: Boolean, default: false}
});

module.exports = mongoose.model("User", userSchema);
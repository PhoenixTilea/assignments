const mongoose = require("mongoose");

const bountySchema = new mongoose.Schema({
	firstname: {type: String, required: true},
	lastname: {type: String, required: true},
	type: {type: ["Jedi", "Sith"], required: true},
	amount: {type: Number, required: true},
	living: {type: Boolean, required: true}
});

module.exports = mongoose.model("Bounty", bountySchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
	name: {type: String, required: true},
	type: {type: String, required: true},
	desc: String,
	price: {type: Number, required: true}
});

module.exports = mongoose.model("Item", ItemSchema);
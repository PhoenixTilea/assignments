const mongoose = require("mongoose");
const bCrypt = require("bcrypt");
const {Schema} = mongoose;

const userSchema = new Schema({
	username: {
		type: String,
		lower: true,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	memberSince: {
		type: Date,
		default: Date.now()
	}
});
userSchema.pre("save", function (next) {
	const user = this;
	if (!user.isModified("password")) {
		return next();
	}
	bCrypt.hash(user.password, 10, function (err, hash) {
		if (err) {
			return next(err);
		}
		user.password = hash;
		return next();
	});
});
userSchema.methods.checkPassword = function (attempt, callback) {
	bCrypt.compare(attempt, this.password, (err, isMatch) => {
		if (err) {
			return callback(err);
		} else {
			return callback(null, isMatch);
		}
	});
};
userSchema.methods.withoutPassword = function () {
	const user = this.toObject();
	delete user.password;
	return user;
};

module.exports = mongoose.model("User", userSchema);
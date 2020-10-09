const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {Schema} = mongoose;

const userSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	joinDate: {
		type: Date,
		default: Date.now()
	}
});

userSchema.pre("save", function (next) {
	const user = this;
	if (!user.isModified("password")) {
		return next();
	}
	bcrypt.hash(user.password, 10, function (err, hash) {
		if (err) {
			return next(err);
		}
		user.password = hash;
		return next();
	});
});

userSchema.methods.checkPassword = function (attempt, callback) {
	bcrypt.compare(attempt, this.password, (err, isMatch) => {
		if (err) {
			return callback(err);
		}
		return callback(null, isMatch);
	});
};

userSchema.methods.withoutPassword = function () {
	const user = this.toObject();
	delete user.password;
	return user;
};


module.exports = mongoose.model("User", userSchema);
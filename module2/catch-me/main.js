function sum(x, y) {
	if (typeof x !== "number" || Number.isNaN(x)) {
		throw "Type Error: First value is not a number";
	} else if (typeof y !== "number" || Number.isNaN(y)) {
		throw "Type Error: Second value is not a number";
	}
	return x + y;
}

try {
	sum("1", "2");
} catch (err) {
	console.log(err);
}


const user = { username: "Sam", password: "123abc" };

function login(username, password) {
	if (username !== user.username) {
		throw "Invalid username";
	} else if (password !== user.password) {
		throw "Invalid password";
	}
	console.log("Login successful!");
}

try {
	login("Sam", "123abc");
	login("sam", "123abc");
} catch (err) {
	console.log(err);
}
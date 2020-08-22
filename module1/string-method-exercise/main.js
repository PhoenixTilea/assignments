function capAndLower(str) {
	return str.toUpperCase() + str.toLowerCase();
}

function middleIndex(str) {
	return Math.floor(str.length / 2);
}

function firstHalf(str) {
	return str.slice(0, middleIndex(str));
}

function mixCase(str) {
	let mi = middleIndex(str);
	return firstHalf(str).toUpperCase() + str.slice(mi).toLowerCase();
}

function heading(str) {
	let arr = str.split(" ");
	arr.map(word => {
		return word[0].toUpperCase() + word.slice(1);
	});
	return arr.join(" ");
}
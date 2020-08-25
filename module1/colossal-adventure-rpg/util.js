function random(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.round(Math.random() * (max - min)) + min;
}

function cap(str) {
	return str[0].toUpperCase() + str.slice(1);
}
function either(arr) {
	return arr[random(0, arr.length - 1)];
}

module.exports = { random, cap, either };
module.exports = {
random(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.round(Math.random() * (max - min)) + min;
},

cap(str) {
	return str[0].toUpperCase() + str.slice(1);
},

titleCase(str) {
	let words = str.split(" ");
	arr.map(word => cap(word));
	return words.join(" ");
},

either(arr) {
	return arr[random(0, arr.length - 1)];
}

};
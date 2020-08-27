function ascendingNumbers(arr) {
	return arr.sort((a, b) => a - b);
}

function descendingNumbers(arr) {
	return arr.sort((a, b) => b - a);
}


function shortestToLongest(arr) {
	return arr.sort((a, b) => a.length - b.length);
}

function alphabeticSort(arr) {
	return arr.sort();
}

function youngestToOldest(arr) {
	return arr.sort((a, b) => a.age - b.age);
}

// Test

console.log(ascendingNumbers([1, 3, 5, 2, 90, 20]));
console.log(descendingNumbers([1, 3, 5, 2, 90, 20]));
console.log(shortestToLongest(["dog", "wolf", "by", "family", "eaten"]));
console.log(alphabeticSort(["dog", "wolf", "by", "family", "eaten"]));
console.log(youngestToOldest([
    { name: "Quiet Samurai", age: 22 },
    { name: "Arrogant Ambassador", age: 100 },
    { name: "Misunderstood Observer", age: 2 },
    { name: "Unlucky Swami", age: 77 }
]));
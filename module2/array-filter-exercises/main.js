function fiveOrGreater(arr) {
	return arr.filter(num => (num >= 5));
}

function even(arr) {
	return arr.filter(num => (num % 2 === 0));
}

function fiveCharsOrLess(arr) {
	return arr.filter(str => (str.length <= 5));
}

function inTheClub(arr) {
	return arr.filter(person => person.member);
}

function oldEnough(arr) {
	return arr.filter(person => (person.age >= 18));
}

// Test

console.log(fiveOrGreater([3, 6, 8, 2]));
console.log(even([3, 6, 8, 2]));
console.log(fiveCharsOrLess(["dog", "wolf", "by", "family", "eaten", "camping"]));

console.log(inTheClub([
    { name: "Angelina Jolie", member: true },
    { name: "Eric Jones", member: false },
    { name: "Paris Hilton", member: true },
    { name: "Kayne West", member: false },
    { name: "Bob Ziroll", member: true }
]));
console.log(oldEnough([
    { name: "Angelina Jolie", age: 80 },
    { name: "Eric Jones", age: 2 },
    { name: "Paris Hilton", age: 5 },
    { name: "Kayne West", age: 16 },
    { name: "Bob Ziroll", age: 100 }
]));
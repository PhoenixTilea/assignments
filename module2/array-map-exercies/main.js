function doubles(arr) {
	return arr.map(num => num * 2);
}

function stringify(arr) {
	return arr.map(num => num.toString());
}

function capitalize(arr) {
	return arr.map(name => name[0].toUpperCase() + name.slice(1));
}

function namesOnly(arr) {
	return arr.map(person => person.name);
}

function toTheMatrix(arr) {
	return arr.map(person => {
		if (person.age >= 18) {
			return `${person.name} can go to the Matrix.`;
		} else {
			return `${person.name} is underage.`;
		}
	});
}

function domReady(arr) {
	return arr.map(person => {
		return `<h1>${person.name}</h1><h2>${person.age}</h2>`
	});
}

// Test

console.log(doubles([2, 5, 100]));
console.log(stringify([2, 5, 100]));
console.log(capitalize(["john", "JACOB", "jinGleHeimer", "schmidt"]));


const people = [
    {
        name: "Angelina Jolie",
        age: 80
    },
    {
        name: "Eric Jones",
        age: 2
    },
    {
        name: "Paris Hilton",
        age: 5
    },
    {
        name: "Kayne West",
        age: 16
    },
    {
        name: "Bob Ziroll",
        age: 100
    }
];

console.log(namesOnly(people));
console.log(toTheMatrix(people));
console.log(domReady(people));
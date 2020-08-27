function sortedOfAge(arr) {
	return arr.filter(person => (person.age > 18))
		.sort((a, b) => {
			if (a.lastName < b.lastName) return -1;
			else if (a.lastName > b.lastName) return 1;
			else return 0;
		})
.map(person => `<li>${person.firstName} ${person.lastName} is ${person.age}</li>`);
}

let peopleArray = [
    {
        firstName: "Sarah",
        lastName: "Palin",
        age: 47
    },
    {
        firstName: "Frank",
        lastName: "Zappa",
        age: 12
    },
    {
        firstName: "Rick",
        lastName: "Sanchez",
        age: 78
    },
    {
        firstName: "Morty",
        lastName: "Smith",
        age: 29
    },
    {
        firstName: "Kyle",
        lastName: "Mooney",
        age: 27
    },
    {
        firstName: "Pasha",
        lastName: "Datsyuk",
        age: 13
    },
    {
        firstName: "Lev",
        lastName: "Tolstoy",
        age: 82
    }
];

console.log(sortedOfAge(peopleArray));

// Extra
let morePeople = [
	{
		firstName: "Maya",
		lastName: "Fey",
		age: 20
	},
	{
		firstName: "Miles",
		lastName: "Edgeworth",
		age: 26
	},
	{
		firstName: "Phoenix",
		lastName: "Wright",
		age: 26
	}
];

peopleArray = peopleArray.concat(morePeople);

let filtered = peopleArray.filter(person => {
	let last = person.lastName[person.lastName.length - 1].toLowerCase();
	return last !== "a" || last !== "y";
});

filtered = filtered.splice(1, 1);

console.log(filtered.reverse());
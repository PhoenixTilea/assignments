// ==========
// Preliminaries
// ==========

for (let i = 0; i < 10; ++i) {
	console.log(i);
}
for (let i = 9; i >= 0; --i) {
	console.log(i);
}
let fruit = ["banana", "orange", "apple", "kiwi"];
for (let i = 0; i < fruit.length; ++i) {
	console.log(fruit[i] + " ");
}

// ==========
// Bronze
// ==========

let arr = [];
for (let i = 0; i < 10; ++i) {
	arr.push(i);
}
for (let i = 0; i <= 100; i += 2) {
	console.log(i);
}

fruit = ["banana", "orange", "apple", "kiwi", "pear", "peach"];
let someFruit = [];
for (let i = 0; i < fruit.length; i += 2) {
	someFruit.push(fruit[i]);
}

// ==========
// Silver
// ==========

let peopleArray = [
  {
    name: "Harrison Ford",
    occupation: "Actor"
  },
  {
    name: "Justin Bieber",
    occupation: "Singer"
  },
  {
    name: "Vladimir Putin",
    occupation: "Politician"
  },
  {
    name: "Oprah",
    occupation: "Entertainer"
  }
];

let names = [];
let occupations = [];
let someNames = [];
let someOccupations = [];
peopleArray.forEach((person, i) => {
	console.log(person.name);
	names.push(person.name);
	occupations.push(person.occupation);
	if (i % 2 === 0) {
		someNames.push(person.name);
	} else {
		someOccupations.push(person.occupation);
	}
});

// ==========
// Gold
// ==========

let grid1 = [];
for (let x = 0; x < 3; ++x) {
	grid1.push([]);
	for (let y = 0; y < 3; ++y) {
		grid1[x].push(0);
	}
}

let grid2 = [];
for (let x = 0; x < 3; ++x) {
	grid2.push([]);
	for (let y = 0; y < 3; ++y) {
		grid2[x].push(x);
	}
}

let grid3 = [];
for (let x = 0; x < 3; ++x) {
	grid3.push([]);
	for (let y = 0; y < 3; ++y) {
		grid3[x].push(y);
	}
}

function xs(grid) {
	for (let x = 0; x < grid.length; ++x) {
		for (let y = 0; y < grid[x].length; ++y) {
			grid[x][y] = "X";
		}
	}
}
// ==========
// 1
// ==========

function collectAnimals(...animals) {
	return animals;
}

console.log(collectAnimals("dog", "cat", "mouse", "jackolope", "platypus"));

// ==========
// 2
// ==========

function combineFood(fruits, sweets, vegetables) {
	return { fruits, sweets, vegetables };
}

console.log(combineFood(["apple", "pear"],
             ["cake", "pie"],
             ["carrit"]
));

// ==========
// 3
// ==========

const vacation = {  
  location: "Burly Idaho",
  duration: "2 weeks"
};

function parseSentence({ location, duration}) {
	return `We're going to have a good time in ${location} for ${duration}`;
}

console.log(parseSentence(vacation));

// ==========
// 4
// ==========

function returnFirst(items){
const [ firstItem ] = items;
    return firstItem;
}

// ==========
// 5
// ==========

const favoriteActivities = ["magnets", "snowboarding", "philanthropy", "janitor work", "eating"];

function returnFavorites(arr) {
	const [ firstFav, secondFav, thirdFav ] = arr;
	return `My top three favorite activities are ${firstFav}, ${secondFav}, and ${thirdFav}.`;
}
console.log(returnFavorites(favoriteActivities));

// ==========
// 6
// ==========

function combineAnimals(...animals) {
	let combined = [];
	for (let i = 0; i < animals.length; ++i) {
		combined.push(...animals[i]);
	}
	return combined;
}

const realAnimals = ["dog", "cat", "mouse"];
const magicalAnimals = ["jackolope"];
const mysteriousAnimals = ["platypus"];

console.log(combineAnimals(realAnimals, magicalAnimals, mysteriousAnimals));

// ==========
// 7
// ==========

function product(...number) {
	return numbers.reduce((acc, num) => acc * num);
}

function unshift(arr, ...values) {
	return [...arr, ...values];
}

// ==========
// 8
// ==========

function populatePeople(names) {
	return names.map(name => {
		let [ firstname, lastname ] = name.split(" ");
		return { firstname, lastname };
	});
}

console.log(populatePeople(["Frank Peterson", "Suzy Degual", "Liza Jones"]));
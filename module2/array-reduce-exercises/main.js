function sum(arr) {
	return arr.reduce((a, b) => a + b);
}

function sequence(arr) {
	return arr.reduce((a, b) => `${a}${b}`);
}

function countVotes(arr) {
	return arr.reduce((acc, voter) => {
		if (voter.voted) {
			++acc;
		}
		return acc;
	}, 0);
}

function shoppingSpree(arr) {
	return arr.reduce((total, item) => total += item.price, 0);
}

function flatten(arr) {
	return arr.reduce((flat, arr) => flat.concat(arr));
}

function tallyVotes(arr) {
	let tally = {
		youngPeople: 0,
		youngVotes: 0,
		midPeople: 0,
		midVotes: 0,
		oldPeople: 0,
		oldVotes: 0
	};
	return arr.reduce((tally, voter) => {
		if (voter.age <= 25) {
			++tally.youngPeople;
			if (voter.voted) {
				++tally.youngVotes;
			}
		} else if (voter.age <= 35) {
			++tally.midPeople;
			if (voter.voted) {
				++tally.midVotes;
			}
		} else {
			++tally.oldPeople;
			if (voter.voted) {
				++tally.oldVotes;
			}
		}
		return tally;
	}, tally);
}

// Test
console.log(sum([1, 2, 3]));
console.log(sequence([1, 2, 3]));
console.log(countVotes([
    {name:'Bob' , age: 30, voted: true},
    {name:'Jake' , age: 32, voted: true},
    {name:'Kate' , age: 25, voted: false},
    {name:'Sam' , age: 20, voted: false},
    {name:'Phil' , age: 21, voted: true},
    {name:'Ed' , age:55, voted:true},
    {name:'Tami' , age: 54, voted:true},
    {name: 'Mary', age: 31, voted: false},
    {name: 'Becky', age: 43, voted: false},
    {name: 'Joey', age: 41, voted: true},
    {name: 'Jeff', age: 30, voted: true},
    {name: 'Zack', age: 19, voted: false}
]));
console.log(shoppingSpree([
    { title: "Tesla Model S", price: 90000 },
    { title: "4 carat diamond ring", price: 45000 },
    { title: "Fancy hacky Sack", price: 5 },
    { title: "Gold fidgit spinner", price: 2000 },
    { title: "A second Tesla Model S", price: 90000 }
]));
console.log(flatten([
    ["1", "2", "3"],
    [true],
    [4, 5, 6]
]));
console.log(tallyVotes([
    {name:'Bob' , age: 30, voted: true},
    {name:'Jake' , age: 32, voted: true},
    {name:'Kate' , age: 25, voted: false},
    {name:'Sam' , age: 20, voted: false},
    {name:'Phil' , age: 21, voted: true},
    {name:'Ed' , age:55, voted:true},
    {name:'Tami' , age: 54, voted:true},
    {name: 'Mary', age: 31, voted: false},
    {name: 'Becky', age: 43, voted: false},
    {name: 'Joey', age: 41, voted: true},
    {name: 'Jeff', age: 30, voted: true},
    {name: 'Zack', age: 19, voted: false}
]));
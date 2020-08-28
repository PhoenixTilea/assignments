// ==========
// Let and Const
// ==========

const name = "John"
const age = 101

function runForLoop(pets) {
    let petObjects = []
    for (let i = 0; i < pets.length; i++) {
        const pet = { type: pets[i] }
        let name;
        if (pets[i] === "cat") {
            name = "fluffy"
        } else {
            name = "spot"
        }
        console.log("pet name: ", name)
        pet.name = name
        petObjects.push(pet)
    }
    console.log("man name: ", name)
    return petObjects
}

runForLoop(["cat", "dog"])

// ==========
// Arrow Functions
// ==========

const carrots = ["bright orange", "ripe", "rotten"]

function mapVegetables(arr) {
    return arr.map(carrot => ({ type: "carrot", name: carrot }))
}

const people = [
    {
        name: "Princess Peach",
        friendly: false
    },
    {
        name: "Luigi",
        friendly: true
    },
    {
        name: "Mario",
        friendly: true
    },
    {
        name: "Bowser",
        friendly: false
    }
]

function filterForFriendly(arr) {
    return arr.filter(person => person.friendly)
}

const doMathSum = (a, b) => a + b;
const produceProduct = (a, b) => a * b;

const printString = (firstname = "Jane", lastname = "Doe", age = 100) => `Hi, ${firstname} ${lastname}. How does it feel to be ${age}?`;


const animals = [
   {
       type: "dog",
       name: "theodore"
   },
   {
       type: "cat",
       name: "whiskers"
   },
   {
       type: "pig",
       name: "piglette"
   },
   {
       type: "dog",
       name: "sparky"
   }
];

function filterForDogs(arr) {
	return arr.filter(animal => (animal.type === "dog"));
}
console.log(filterForDogs(animals));

// ==========
// Template Literals
// ==========

function nameAndLocation(name, location) {
	return `Hi, ${name}.
	
	Welcome to ${location}.
	
	We hope you enjoy your stay.`;
}
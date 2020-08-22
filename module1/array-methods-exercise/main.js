var fruit = ["banana", "apple", "orange", "watermelon"];
var vegetables = ["carrot", "tomato", "pepper", "lettuce"];

function doStuff() {
	vegetables.pop();
	log();
	
	fruit.shift();
	log();
	
	fruit.push(fruit.indexOf("orange"));
	log();
	
	vegetables.push(vegetables.length);
	log();
	
	let foods = fruit.concat(vegetables);
	console.log("Foods: ", foods);
	
	foods = foods.filter((food, i) => {
		if (i === 4 || i === 5) {
			return false;
		}
		return true;
	});
	console.log("Foods: ", foods);
	
	foods.reverse();
	console.log("Foods: ", foods);
	
	return foods.join(", ");
}

function log() {
	console.log("Fruit: ", fruit);
	console.log("Vegetables: ", vegetables);
}

console.log(doStuff());
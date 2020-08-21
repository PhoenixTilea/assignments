const readline = require("readline-sync");

function add(num1, num2) {
	return num1 + num2;
}

function sub(num1, num2) {
	return num1 - num2;
}

function mul(num1, num2) {
	return num1 * num2;
}

function div(num1, num2) {
	return num1 / num2;
}

let ops = ["add", "sub", "mul", "div"];
let done = false;
console.log("Welcome to the calculator. ");
while (!done) {
	let num1 = parseInt(readline.question("Please enter your first number: "));
	while (Number.isNaN(num1)) {
		num1 = parseInt(readline.question("Sorry, that wasn't a valid integer. Please enter your first number: "));
	}
	let num2 = parseInt(readline.question("Please enter a second number: "));
	while (Number.isNaN(num2)) {
		num2 = parseInt(readline.question("Sorry, that wasn't a valid integer. Please enter your second number: "));
	}
	
	let op = readline.question("Which operation would you like to perform: add, sub, mul, div: ").toLowerCase();
	while (ops.indexOf(op) === -1) {
		op = readline.question("Sorry, I didn't get that. Please choose an operation. add, sub, mul, div: ").toLowerCase();
	}
	
	let result;
	switch (op) {
		case "add":
			result = add(num1, num2);
			break;
		case "sub":
			result = sub(num1, num2);
			break;
		case "mul":
			result = mul(num1, num2);
			break;
		case "div":
			if (num2 !== 0) {
				result = div(num1, num2);
			} else {
				result = "divide by zero";
			}
			break;
	}
	
	if (typeof result === "number") {
		console.log("Your result is: " + result);
	} else {
		console.log("You have attempted to divide by zero, thus destroying the universe. Thanks a lot!");
	}
	done = !readline.keyInYN("Would you like to perform another operation? ");
}
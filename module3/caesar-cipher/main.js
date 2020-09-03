const readline = require("readline-sync");

const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

let message = readline.question("What message would you like to encode? ").toLowerCase();
let shift = readline.questionInt("By how many letters would you like to shift? ");

let encoded = "";
for (let i = 0; i < message.length; i++) {
	if (message[i] >= "a" && message[i] <= "z") {
		let index = alphabet.indexOf(message[i]) + shift;
		while (index < 0) {
			index += 26;
		}
		while (index > 25) {
			index -= 26;
		}
		encoded += alphabet[index];
	}
}

console.log("Your encoded message is: " + encoded);
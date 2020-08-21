const readline = require("readline-sync");

const options = ["Put hand in hole", "find the key", "open the door"];
let hasKey = false;
let died = false;
let gaveUp = false;
let end = false;

console.log("You wake to find yourself in a small, dark room with nothing but a locked door, an odd fist-sized hole in the wall, and a thick layer of dust over everything.");
while (!end) {
	let action = readline.keyInSelect(options, "What do you do? ");
	
	switch (action) {
		case 0:
			console.log("Too curious for your own good, you stick your hand into the hole. You receive a powerful electric shock and black out instantly.");
			died = true;
			end = true;
			break;
		case 1:
			if (!hasKey) {
				console.log("Hoping against hope, you feel around in the dust at your feet until you grasp something small and metalic. It's a key!");
				hasKey = true;
			} else {
				console.log("You've already found a key. Luck willing, it fits the door.");
			}
			break;
		case 2:
			if (hasKey) {
				console.log("You fumble with the key until it slides into the lock. You turn it and hear an unmistakable 'click'. You tug the handle and the door swings open, bathing your face in warm sunlight. You take a deep breath of fresh air and stride from your temporary prison.");
				end = true;
			} else {
				console.log("You twist and tug the handle in a desperate bid for freedom, but it simply won't budge.");
			}
				break;
			default:
				console.log("Hopeless, you sit on the floor and wait to either be rescued or starve.");
				gaveUp = true;
				end = true;
				break;
		}
}

if (died) {
	console.log("You have died. Sticking your hands where they don't belong should probably be a last resort. Better luck next time.");
} else if (gaveUp) {
	console.log("Giving up so soon? I'm afraid you just aren't protagonist material yet. Try again when you're feeling more ambitious.");
} else {
	console.log("Congratulations! You escaped! That wasn't so bad, was it?");
}
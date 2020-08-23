const readline = require("readline-sync");
const { items, enemies, weapons, goals, races } = require("./data");
const Msg = require("./messages");
const Character = require("./Character");
const Player = require("./Player");

// ==========
// Game State
// ==========

let inBattle = false;
let smokebomb = false;
let quit = false;
let player;

// ==========
// Game Loop
// ==========

intro();
while (player.hp > 0 && !quit) {
	let command = readline.question("What do you do? (type 'help' or 'h' for a list of commands): ";
	switch (command) {
		case "2":
		case "walk": {
			let n = Util.random(1, 4);
			if (n === 1) {
				fight();
			} else if (n === 2 && player.race === "dwarf" && Util.random(1, 2) === 1) {
				fight();
			} else if (n === 4) {
				stageDoor();
			} else {
				randomEvent();
			}
		}
		break;
		
		case "u":
		case "use": {
			useItem();
		}
		break;
		
		case "q":
		case "quit": {
			quit = confirmQuit();
		}
		break;
		
		default: {
			console.log("Sorry, I didn't understand that command.");
		}
	}
}
end();

// ==========
// Sequences
// ==========

function intro() {
	
}

function fight() {
	inBattle = true;
	let enemy = new Character(...Util.either(enemies));
	let actions = ["Attack", "Use an Item", "Run!"];
	console.log(`A ${enemy.name} emerges from the gloom, blocking your path!`);
	do {
		let a = readline.keyInSelect(actions, "What do you do? ");
		switch (a) {
			case 0:
			
			case 1: {
				useItem();
				if (smokeBomb) {
					smokebomb = false;
					return;
				}
			}
			break;
			
			case 2: {
				if (Util.random(1, 100) > 50) {
					console.log(Msg.escape());
					return;
				} else {
					console.log(Msg.failedEscape());
				}
			}
			break;
			
			default:
				quit = confirmQuit();
				if (quit) return;
				break;
		}
	} while (enemy.hp > 0 && player.hp > 0);
	if (player.hp > 0) {
		console.log(Msg.enemyDeath(enemy.name));
	} else {
		console.log(Msg.playerDeath(player));
	}
}

function useItem() {
	let itemList = [];
	for (let name in player.inventory) {
		if (name !== "small key" && player.inventory[name] > 0) {
			itemList.push(name);
		}
	}
	let item = itemList[readline.keyInSelect(itemList, "Which item would you like to use? ")];
	switch (item) {
		case "potion": {
			
		}
		break;
		
		case "firebomb": {
			if (inBattle) {
				
			} else {
				console.log(Msg.noUse());
			}
		}
		break;
		
		case "smokebomb": {
			if (inBattle) {
				smokebomb = true;
			} else {
				console.log(Msg.noUse());
			}
		}
		break;
		
		default: break;
	}
}

function randomEvent() {
	
}

function stageDoor() {
	
}

function confirmQuit() {
	return readline.keyInYN("Are you sure you want to quit? ");
}

function end() {
	
}


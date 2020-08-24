const readline = require("readline-sync");
const { items, enemies, weapons, goals, races } = require("./data");
const Msg = require("./messages");
const Util = require("./util");
const Character = require("./Character");
const Player = require("./Player");

// ==========
// Game State
// ==========

let inBattle = false;
let smokebomb = false;
let quit = false;
let player;
let enemy = null;

// ==========
// Game Loop
// ==========

intro();
while (player.hp > 0 && !quit) {
	let command = readline.question("What do you do? (type 'help' or 'h' for a list of commands): ");
	switch (command) {
		case "w":
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
		
		case "p":
		case "print": {
			printStatus();
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
		
		case "h":
		case "help": {
			printHelp();
		}
		
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
	
	let name = readline.question("What is your name? ");
	if (name.replace(" ", "").length === 0) {
		quit = true;
		return;
	}
	console.log(`Welcome, ${name}. Which fantasy race would you like to be? `);
	let race = races[readline.keyInSelect(races, "Choose a race. ")];
	if (!race) {
		quit = true;
		return;
	}
	console.log("Of course! Now, what is your weapon of choice? ");
	let weapon = weapons[readline.keyInSelect(weapons, "Choose a weapon. ")];
	if (!weapon) {
		quit = true;
		return;
	}
	console.log("Got it. And, last but not least, what possessed you to venture inside this spooky hilltop manner? ");
	let goal = goals[readline.keyInSelect(goals, "Choose a goal. ")];
	if (!goal) {
		quit = true;
		return;
	}
	
	player = new Player(name, weapon, race, goal);
	console.log("Varily! Best of luck on this very haunted adventure! (Enter/Return to continue)... ");
}

function fight() {
	inBattle = true;
	enemy = new Character(...Util.either(enemies));
	let actions = ["Attack", "Use an Item", "Run!"];
	console.log(`A ${enemy.name} emerges from the gloom, blocking your path!`);
	let tookTurn = false;
	do {
		let a = readline.keyInSelect(actions, "What do you do? ");
		switch (a) {
			case 0: {
				let dmg = random(1, 10);
				enemy.damage(dmg);
				console.log(Msg.attack(player, enemy, dmg));
				tookTurn = true;
			}
			break;
			
			case 1: {
				tookTurn = useItem();
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
					tookTurn = true;
				}
			}
			break;
			
			default:
				quit = confirmQuit();
				if (quit) return;
				break;
		}
		if (tookTurn && enemy.hp > 0) {
			let dmg = Util.random(1, 10);
			player.damage(dmg);
			console.log(Msg.attack(enemy, player, dmg));
			console.log(`You have ${player.hp}/${player.maxHp} health remaining.`);
			tookTurn = false;
		}
	} while (enemy.hp > 0 && player.hp > 0);
	if (player.hp > 0) {
		console.log(Msg.enemyDeath(enemy.name));
		let item = Util.either(items);
		let heal = Util.random(1, 10);
		player.heal(heal);
		player.giveItem(item);
		console.log(`You restore ${heal} hit points and receive a ${item}.`);
	} else {
		console.log(Msg.playerDeath(player));
	}
	inBattle = false;
	enemy = null;
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
			if (player.hp < player.maxHp) {
				player.heal(10);
				player.useItem(item);
				console.log(Msg.drinkPotion(player));
			} else {
				console.log(Msg.noUse(item));
				return false;
			}
		}
		break;
		
		case "firebomb": {
			if (inBattle) {
				enemy.damage(20);
				player.useItem(item);
				console.log(Msg.throwFirebomb(enemy));
			} else {
				console.log(Msg.noUse(item));
				return false;
			}
		}
		break;
		
		case "smokebomb": {
			if (inBattle) {
				smokebomb = true;
				player.useItem(item);
				console.log(Msg.throwSmokebomb(enemy));
			} else {
				console.log(Msg.noUse());
				return false;
			}
		}
		break;
		
		default: return false;
	}
	return true;
}

function randomEvent() {
	return "You wander through the foreboding halls of the manner.";
}

function stageDoor() {
	console.log("You come upon a locked door. ");
	if (player.inventory["small key"] > 0) {
		console.log("Fortunately, you have a key that opens it, allowing you to continue unhindered.");
	} else {
		console.log("You have nothing with which to open it, and it looks far too sturdy to force.");
	}
}

function confirmQuit() {
	return readline.keyInYN("Are you sure you want to quit? ");
}

function printStatus() {
	let raceA;
	let weaponA
	if (player.race === "elf") {
		raceA = "an";
	} else {
		raceA = "a";
	}
	if (player.weapon === "axe") {
		weaponA = "an";
	} else {
		weaponA = "a";
	}
	console.log(`You are ${player.name}, ${raceA} ${player.race} adventurer wielding ${weaponA} ${player.weapon}.`);
	console.log(`Health: ${player.hp}/${player.maxHp}`);
	console.log("Inventory: ");
	for (let name in player.inventory) {
		if (player.inventory[name] > 0) {
			console.log(`- ${name} (x${player.inventory[name]}`);
		}
	}
}

function printHelp() {
	console.log(`Enter one of the following commands or the shortcut letter (without perenthesis) to progress the game: 
		- walk (w): Continue exploring the haunted manner
		- use (u): Use one of the items you have stored in your inventory
		- print (p): Get a readout about your character and their status
		- help (h): View this help message
		- quit (q): Quit the game for now
	`);
}

function end() {
	if (quit) {
		console.log("Done for now? Okay. See you soon!");
	} else if (player.hp > 0) {
		return "Congratulations! You've succeeded in your quest!";
	} else {
		return "Better luck next time.";
	}
}


const readline = require("readline-sync");
const { commands, items, enemies, weapons, goals, stages } = require("./data");
const Msg = require("./messages");
const Util = require("./util");
const Character = require("./Character");
const Player = require("./Player");

// ==========
// Game State
// ==========

let stage = 0;
let inBattle = false;
let smokebomb = false;
let quit = false;
let victory = false;
let player;
let enemy = null;

// ==========
// Game Loop
// ==========

intro();
while (!quit && !victory && player.hp > 0) {
	console.log(`You are in the ${stages[stage]}.`);
	let command = readline.question("What do you do? (type 'help' or 'h' for a list of commands): ", {
		limit: commands,
		limitMessage: "Sorry, I didn't understand that command."
	});
	switch (command) {
		case "w":
		case "walk": {
			let n = Util.random(1, 6);
			if (n < 3) {
				fight();
			}else if (n === 6) {
				stageDoor();
			} else {
				console.log(randomEvent());
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
		break;
	}
}
end();

// ==========
// Sequences
// ==========

function intro() {
	readline.keyInPause("Welcome to \"House on a Hill\", an adventure RPG where you will explore a haunted manor, do battle with the undead and other monsters, collect loot, and at last reach your chosen goal - if you can survive that long...");
	let name = readline.question("What is your name? ");
	if (name.length === 0) {
		quit = true;
		return;
	}
	console.log(`Welcome, ${name}. What is your weapon of choice? `);
	let weapon = weapons[readline.keyInSelect(weapons, "Choose a weapon. ", { cancel: "Quit" })];
	if (!weapon) {
		quit = true;
		return;
	}
	console.log("Got it. And, last but not least, what possessed you to venture inside this spooky hilltop manner? ");
	let goal = goals[readline.keyInSelect(goals, "Choose a goal. ", { cancel: "Quit" })];
	if (!goal) {
		quit = true;
		return;
	}
	
	player = new Player(name, weapon, goal);
	readline.keyInPause("Varily! Best of luck on this very haunted adventure! ");
	
	console.log("for what feels like the hundredth time you stare at the old, faded map. The thing is surely outdated, but the manorhouse shouldn't have gone anywhere. You raise your eyes to the darkening gloom and squint. Yes... Yes, there is something up ahead, something vast and looming.");
	switch (goals.indexOf(goal)) {
		case 0: {
			console.log(`A heavy weight settles in your chest as you look upon the shadowy structure. It wouldn't take a paladin or priest to declare this place a seat of something malevolent and powerful. This must be where the necromancer plauging the village makes his lair. Steeling your resolve, you march through the rusted iron gate standing open at the base of the hill, your trusty magic ${weapon} at the ready.`);
		}
		break;
		
		case 1: {
			console.log(`"Well," you say aloud to yourself, "I guess if these ancient treasures were ever someplace nice, they wouldn't still be up for grabs." That isn't exactly a comfort, but you've never been one to shy away from a little risk for a great reward. Keeping close the magic ${weapon} you uncovered from another of these treasure hunts, you pass beyond the rusted iron gate at the base of the hill, your sights set on the manor and the prize within.`);
		}
		break;
		
		case 2: {
			console.log(`Your heart sinks just a little. If the mayor's daughter really is in there, how could she possibly still live? You clench your jaw and steel your nerves; whether the girl lives or not, you will punish those who took her and ensure her father is no longer left to worry. Grasp tight on your magic ${weapon}, you march through the rusted entry gate, ready to face whatever evil stands in your way.`);
		}
		break;
		
		case 3: {
			console.log(`Well, it certainly looks spooky enough. You've never explored a haunted house before, and you're pretty sure this ones hella haunted. Wondering if the magic ${weapon} you picked up at the comicbook shop will work against ghosts, you stroll through the rusted iron gate at the base of the hill.`);
		}
		break;
	}
}

function fight(e) {
	inBattle = true;
	enemy = e || new Character(...Util.either(enemies));
	let actions; 
	if (enemy.name !== "necromancer") {
		actions = ["Attack", "Use an Item", "Run!"];
	} else {
		actions = ["Attack", "Use an Item"];
	}
	readline.keyInPause(Msg.enemyAppears(enemy));
	let tookTurn = false;
	do {
		let a = readline.keyInSelect(actions, "What do you do? ", { cancel: "Quit" });
		switch (a) {
			case 0: {
				let dmg = Util.random(1, 10);
				enemy.damage(dmg);
				console.log(Msg.attack(player, enemy, dmg));
				tookTurn = true;
			}
			break;
			
			case 1: {
				tookTurn = useItem();
				if (smokebomb) {
					smokebomb = false;
					return;
				}
			}
			break;
			
			case 2: {
				if (Util.random(1, 100) > 50) {
					console.log(Msg.escape(enemy));
					return;
				} else {
					console.log(Msg.failedEscape(enemy));
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
		console.log(Msg.enemyDeath(enemy));
		let item = Util.either(items);
		let heal = Util.random(1, 5);
		player.heal(heal);
		player.giveItem(item);
		console.log(`You restore ${heal} health and receive a ${item}.`);
	} else {
		console.log(Msg.playerDeath(player));
	}
	inBattle = false;
	enemy = null;
}

function useItem() {
	let itemList = [];
	for (let name in player.inventory) {
		if (name !== "key" && player.inventory[name] > 0) {
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
				if (enemy.name === "necromancer") {
					console.log("Sorry, but there's no escaping the final bout.");
				} else {
				smokebomb = true;
				player.useItem(item);
				console.log(Msg.throwSmokebomb(enemy));
				}
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
	switch (stage) {
		case 0: return Msg.groundsEvent();
		case 1: return Msg.groundFloorEvent();
		case 2: return Msg.dungeonEvent();
		case 3: return Msg.cryptEvent();
	}
}

function stageDoor() {
	console.log("You come upon a locked door. ");
	if (player.inventory.key > 0) {
		player.useItem("key");
		console.log("Fortunately, you have a key that opens it, allowing you to continue unhindered.");
		++stage;
		if (stage === 4) {
			finalBattle();
		}
	} else {
		console.log("You have nothing with which to open it, and it looks far too sturdy to force.");
	}
}

function finalBattle() {
	readline.keyInPause(`The hinges creak and whine as you push open the iron-banded door in the lowest chamber of the crypt. A sickly green light assaults your eyes, and you tighten your grip on your ${player.weapon} as you step through.`);
	console.log("You hear the cackling laughter before you see its source. A gaunt-faced man in dark, flowing robes emerges from the shadows at the back of the room, his skull-like countenence grinning maniacally. \"I was wondering if you would make it this far, hero.\" Sarcasm and disdain drip from his final word.");
	switch (goals.indexOf(player.goal)) {
		case 0: {
			console.log("You take a confident step forward. \"And it is unfortunate for you that I have, vile fiend! Prepare to meet your well-deserved doom at my hands!\"");
			console.log("The necromancer cackles even louder. \"Arrogant fool! My magic will destroy you!\"");
		}
		break;
		
		case 1: {
			console.log("\"It'll take more than a few ghosts and creepy crawlies to keep me from a promise of treasure,\" you point out with a laugh of your own. \"You know, if you just hand it over, I'll be on my way and you can keep doing... whatever it is you do all day.\"");
			console.log("The necromancer sneers. \"So, you've come for my staff, have you? Well, allow me to show you what your averice will earn!\"");
		}
		break;
		
		case 2: {
			console.log("You take an aggressive step forward. \"I've had enough of your minions and games, necromancer. I'm here for the mayor's daughter. Release her to me or suffer the consequences!\"");
			console.log("\"Naive fool!\" the necromancer exclaims. \"You barge into my home to steal my bride? Prepare to face the true power of the undead!\"");
		}
		break;
		
		case 3: {
			console.log("You look around with mild curiosity. \"So, you like... actually live down here? Kinda' gross, dude, but whatever floats your boat.\"");
			console.log("\"Foolish mortal! You cannot even begin to understand the machinations of a great necromancer such as-\"");
			console.log("\"That's a neat staff. Can I have it?\"");
			console.log("The necromancer sputters indignantly. \"What? No! I've had enough of this! Die, you ignoramus!\"");
		}
		break;
	}
	fight(new Character("necromancer", 40, "staff"));
	if (player.hp > 0) {
		victory = true;
	}
}

function confirmQuit() {
	return readline.keyInYN("Are you sure you want to quit? ");
}

function printStatus() {
	let weaponA
	if (player.weapon === "axe") {
		weaponA = "an";
	} else {
		weaponA = "a";
	}
	console.log(`You are ${player.name}, an adventurer wielding ${weaponA} ${player.weapon}.`);
	console.log(`Health: ${player.hp}/${player.maxHp}`);
	console.log("Inventory: ");
	for (let name in player.inventory) {
		if (player.inventory[name] > 0) {
			console.log(`- ${name} (x${player.inventory[name]})`);
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
	} else if (victory) {
		console.log("As you watch the necromancer crumple to the floor, wondering what was so magical about him hitting you with his staff, you feel something in the air change. His evil permiated this place, but now that he has fallen, it's just an ordinary, rundown, creepy-looking manor on a hill.");
		switch (goals.indexOf(player.goal)) {
			case 0: {
				console.log("You stride forward and snatch up the necromancer's staff, wasting no time in snapping the foul thing in twain upon your knee. Faint whispers and screams reach your ears as tendrils of shadow leak from the broken haft, then all is still. Your mission complete, you leave this horrid place without a backward glance.");
			}
			break;
			
			case 1: {
				console.log("The necromancer's staff lies useless beside his lifeless corpse and you waste no time in snatching it up. Despite his apparent incompetence with it, you can tell just by holding it in your hands that it's powerful... just as long as you're a bit careful with it. Your prize attained, you whistle to yourself as you make your way out of the dank and dingy manor, already thinking forward to your next big adventure.");
			}
			break;
			
			case 2: {
				console.log("\"Ugh! You idiot!\" You whirl to face the speaker and find a young woman all dressed in dark robes and makeup. \"You ruined everything! I told Father it wasn't just a phase!\"");
				console.log("\"Er... I'm sorry, my lady?\"");
				console.log("She sighs heavily. \"Whatever. Just take me back home.\"");
				console.log("Victory dubiously attained, you escort the pouting girl from the manor and back to her home village. Oh well. At least you got paid.");
			}
			break;
			
			case 3: {
				console.log("\"Well, that's boring,\" you gripe to yourself, watching the torches in the room turn from green to ordinary yellow. You walk over to pick up the staff lying beside the necromancer's corpse, immediately feeling its dark power surge through you. You hum in thought as you examine the artifact, then get a neat idea.");
				console.log("You've never commanded an army of the undead before...");
			}
			break;
		}
		console.log("Congratulations! You've succeeded in your quest!");
	} else {
		console.log("Better luck next time.");
	}
}


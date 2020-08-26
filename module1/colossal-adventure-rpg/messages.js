const Util = require("./util");

module.exports = {
takeDamage(chr, amount) {
	let verb = Util.either([
		["take", "takes"],
		["suffer", "suffers"],
		["sustain", "sustains"]
	]);
	return `${Util.cap(chr.toString())} ${chr.verb(...verb)} ${amount} damage.`;
},

receiveHealing(chr, amount) {
	let verb = Util.either([
		["recover", "recovers"],
		["regain", "regains"]
	]);
	return `${Util.cap(chr.toString())} ${chr.verb(...verb)} ${amount} health.`;
},

enemyAppears(enemy) {
	switch (enemy.name) {
		case "skeletal warrior": {
			return Util.either([
				"Some of the bones scattered about the floor suddenly come to life, forming into a skeletal warrior holding a rusty iron axe.",
			]);
		}
		
		case "ghoul": {
			return Util.either([
				"An unpleasant gurgling noise draws your eyes to a dense patch of shadow, from which a slavering ghoul emerges!",
			]);
		}
		
		case "ghost": {
			return Util.either([
				"A rush of cold wind causes you to leap backward, and before your eyes, a spectral figure materializes!"
			]);
		}
		
		case "obligatory giant rat": {
			return Util.either([
				"You whirl at a growl from the shadows, coming face to face with a black rat the size of a large house cat!",
			]);
		}
		
		case "necromancer": {
			return "Waves of darkness eminate from the robed necromancer as he raises his staff in the air.";
		}
		
		default: return "An enemy appears from the shadows.";
	}
},

attack(attacker, opponent, amount) {
	let attackDesc = Util.either([
		`${attacker.verb("attack", "attacks")} ${opponent}`,
		`${attacker.verb("attack", "attacks")} ${opponent} with ${attacker.their()} ${attacker.weapon}`,
		`${attacker.verb("lunge", "lunges")} for ${opponent}`,
		`${attacker.verb("lunge", "lunges")} for ${opponent} with ${attacker.their()} ${attacker.weapon}`,
	]);
	
	if (amount === 0) {
		attackDesc += miss(attacker, opponent);
	} else if (amount <= 3) {
		attackDesc += glancingHit(attacker, opponent);
	} else if (amount <= 7) {
		attackDesc += normalHit(attacker, opponent);
	} else {
		attackDesc += heavyHit(attacker, opponent);
	}
	if (amount > 0) {
		attackDesc = `${attackDesc} ${this.takeDamage(opponent, amount)}`;
	}
	return `${Util.cap(attacker.toString())} ${attackDesc}`;
},

escape(enemy) {
	return Util.either([
		`You duck the next attack from ${enemy} and skid around a corner. After a brief sprint, you are relieved to realize you are not being pursued.`,
	]);
}
,
failedEscape(enemy) {
	return Util.either([
		`You attempt to flee from ${enemy}, but it refuses to give up the chase.`,
	]);
},

playerDeath(player) {
	return "You have died.";
},

enemyDeath(enemy) {
	return `${Util.cap(enemy.toString())} has died.`;
},

drinkPotion(target) {
	return `You drink a potion. ${this.receiveHealing(target, 10)}`;
},

throwFirebomb(target) {
	return `You throw a firebomb at ${target}, causing a small explosion of flame. ${this.takeDamage(target, 20)}`;
},

throwSmokebomb(target) {
	return `You throw a smokebomb at ${target}, obscuring ${target.their()} vision and allowing you to flee.`;
},

noUse(item) {
	switch (item) {
		case "potion": {
			return Util.either([
				"You don't need a potion right now.",
				"You aren't in need of healing.",
				"You feel fine. No need to waste a perfectly good potion."
			]);
		}
		
		case "firebomb": {
			return Util.either([
				"Randomly throwing bombs around sounds like a good way to draw unwanted attention.",
				"Throwing that here won't do you much good.",
				"I sympathize with your wish to burn this place to the ground, but maybe wait until your quest is done?"
			]);
		}
		
		case "smokebomb": {
			return Util.either([
				"That wouldn't accomplish much here.",
				"Why? There's nothing to hide from here.",
				"You should probably save that for when you really need it."
			]);
		}
		
		default: {
			return "That's no use to you here.";
		}
	}
},

groundsEvent() {
	return Util.either([
		"A stale wind blows past, making you shiver.",
		"You hear a distant wail. Could it just be the wind?",
		"A raven crows somewhere to your left.",
		"A flock of ravens burst from a tree ahead, startling you.",
		"Branches of gnarled trees creak ominously in the chill breeze.",
		"A faint whispering surrounds you. You hope its merely the wind through the leaves.",
		"A small rodent screeches in terror somewhere nearby.",
		"Twigs snap behind you, but you see nothing upon looking back."
	]);
},

groundFloorEvent() {
	return Util.either([
		"You wander through the foreboding halls of the manor, trying to make sense of the maze.",
		"You get the creeping feeling someone is watching you.",
		"You hear the sound of a woman's lilting laughter but see nothing.",
		"Torches flicker madly in their sconces as you pass.",
		"You enter a large dining hall, but despite the low murmur of conversation and clinking dishes, it is barren and empty.",
		"You're certain you've passed this intersection already. Are you going in circles?",
		"You walk through an open door and jump as it slams behind you. You spin to confront the offender, but no one is there."
	]);
},

dungeonEvent() {
	return Util.either([
		"Soft weeping comes from an empty cell to your right.",
		"Fresh blood drips down the grimy wall beside you.",
		"Footsteps pass overhead.",
		"Chains rattle somewhere up ahead.",
		"Your shadow wails in agony, nearly giving you a heart attack.",
		"You slip on a puddle of fresh blood, only just catching yourself before you fall.",
		"A cell door to your left whines as it opens and slams of its own accord.",
		"Something skitters by in the darkness."
	]);
},

cryptEvent() {
	return Util.either([
		"You enter a chamber stacked with bones. The eyeless skulls seem to watch as you pass.",
		"Something moves in your peripheral, but when you turn to look, nothing is there.",
		"The too sweet smell of rot assaults your nostrils, forcing you to cover your nose and mouth with your hand.",
		"You hear something being dragged across the floor in an adjacent room.",
		"A boney hand tries to grasp you from a cavity in the wall but retracts once you move away.",
		"Plumes of dust rise from the floor where you step, playing tricks on your eyes."
	]);
}

};

function miss(attacker, opponent) {
	return Util.either([
		`, missing horribly.`,
		` but ${attacker.verb("fail", "fails")} to score a hit.`,
		`, but ${opponent} ${opponent.verb("dodge", "dodges")} out of the way.`,
		`, but ${opponent} ${opponent.verb("manage", "manages")} to deflect the blow.`
	]);
}

function glancingHit(attacker, opponent) {
	return Util.either([
		` but only ${attacker.verb("manage", "manages")} to land a glancing blow.`
	]);
}

function normalHit(attacker, opponent) {
	return Util.either([
			` and ${attacker.verb("land", "lands")} a solid hit.`,
		]);
}

function heavyHit(attacker, opponent) {
	return Util.either([
		" to devastating effect!",
	]);
}
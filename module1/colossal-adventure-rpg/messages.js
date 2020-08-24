const Util = require("./util");

module.exports = {
takeDamage(chr, amount) {
	let verb = Util.either([
		["take", "takes"],
		["suffer", "suffers"],
		["sustain", "sustains"]
	]);
	return `${Util.cap(chr)} ${chr.verb(...verb)} ${amount} damage.`;
},

receiveHealing(chr, amount) {
	let verb = Util.either([
		["recover", "recovers"],
		["regain", "regains"]
	]);
	return `${Util.cap(chr)} ${chr.verb(...verb)} ${amount} health.`;
},

attack(attacker, opponent, amount) {
	let attackDesc = Util.either([
		`${attacker.verb("attack", "attacks")} ${opponent}`,
		`${attacker.verb("attack", "attacks")} ${opponent} with ${attacker.their} ${attacker.weapon}`,
		`${attacker.verb("lunge", "lunges")} for ${opponent}`,
		`${attacker.verb("lunge", "lunges")} for ${opponent} with ${attacker.their} ${attacker.weapon}`,
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
	return `${Util.cap(attacker)} ${attackDesc}`;
},

playerDeath(player) {
	return "You have died.";
},

enemyDeath(enemy) {
	return `${Util.cap(enemy)} has died.`;
},

drinkPotion(target) {
	return `You drink a potion. ${receiveHealing(target, 10)}`;
},

throwFirebomb(target) {
	return `You throw a firebomb at ${target}, causing a small explosion of flame. ${takeDamage(target, 20)}`;
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
	Util.either([
		" to devastating effect!",
	]);
}
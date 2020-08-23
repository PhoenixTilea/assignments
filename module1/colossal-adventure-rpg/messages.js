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
	
}

function normalHit(attacker, opponent) {
	
}

function heavyHit(attacker, opponent) {
	
}
const random = require("./util").random;

module.exports = class Character {
	constructor(name, maxHp, weapon) {
		this.name = name;
		this.maxHp = maxHp;
		this.hp = maxHp;
		this.weapon = weapon;
	}
	
	damage(amount) {
		this.hp = Math.max(0, this.hp - amount);
	}
	
	// ==========
	// Messages
	// ==========
	
	toString() {
		return `the ${this.name}`;
	}
	
	verb(secondPerson, thirdPerson) {
		return thirdPerson;
	}
	
	get their() {
		return "its";
	}
};
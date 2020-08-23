const Character = require("./Character");
const items = require("./data").items;

module.exports = class Player extends Character {
	constructor(name, weapon, race, goal) {
		super(name, 100, weapon);
		this.race = race;
		this.goal = goal;
		this.inventory = {};
		items.forEach(item => this.inventory[item] = 0, this);
	}
	
	heal(amount) {
		this.hp = Math.min(this.maxHp, this.hp + amount);
	}
	
	giveItem(item) {
		++this.inventory[item];
	}
	
	useItem(item) {
		--this.inventory[item];
	}
	
	// ==========
	// Messages
	// ==========
	
	toString() {
		return "you";
	}
	
	verb(secondPerson, thirdPerson) {
		return secondPerson;
	}
	
	get their() {
		return "your";
	}
}
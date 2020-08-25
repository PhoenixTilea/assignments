const Character = require("./Character");
const items = require("./data").items;

function Player(name, weapon, goal) {
	Character.call(this, name, 100, weapon);this.goal = goal;
	this.inventory = {};
	items.forEach(item => this.inventory[item] = 0, this);
}
Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;
Player.prototype.heal = function (amount) {
	this.hp = Math.min(this.maxHp, this.hp + amount);
}
Player.prototype.giveItem = function (item) {
	++this.inventory[item];
}
Player.prototype.useItem = function (item) {
	--this.inventory[item];
}

Player.prototype.toString = function () {
	return "you";
}
Player.prototype.verb = function (secondPerson, thirdPerson) {
	return secondPerson;
}
Player.prototype.their = function () {
	return "your";
}

module.exports = Player;
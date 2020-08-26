const random = require("./util").random;

function Character(name, maxHp, weapon) {
	this.name = name;
	this.maxHp = maxHp;
	this.hp = maxHp;
	this.weapon = weapon;
}
Character.prototype.damage = function (amount) {
	this.hp = Math.max(0, this.hp - amount);
}
Character.prototype.toString = function () {
	return `the ${this.name}`;
}
Character.prototype.verb = function (secondPerson, thirdPerson) {
	return thirdPerson;
}
Character.prototype.their = function () {
	if (this.name === "necromancer") {
		return "his";
	}
	return "its";
}

module.exports = Character;
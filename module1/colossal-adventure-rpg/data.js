const Character = require("./Character");

const items = ["potion", "firebomb", "smokebomb", "small key"];
const races = ["dwarf", "elf", "human"];
const weapons = ["axe", "dagger", "hammer", "spear", "sword"];
const goals = [
	"Defeat a great evil",
	"Find a fabled treasure",
	"Rescue a captive",
	"Because you were bored"
];

const enemies = [
	["skeletal warrior", 20, "rusty axe"],
	[("ghoul", 25, "claws"],
	["ghost", 15, "spectral blade"],
	["giant rat", 10, "fangs"]
];

module.exports = { items, weapons, races, enemies, goals };
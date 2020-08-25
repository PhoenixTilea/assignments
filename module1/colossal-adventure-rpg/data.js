const Character = require("./Character");

const commands = ["w", "walk", "u", "use", "p", "print", "q", "quit", "h", "help"];
const items = ["potion", "firebomb", "smokebomb", "key"];
const weapons = ["axe", "dagger", "hammer", "spear", "sword"];
const goals = [
	"to defeat a great evil",
	"to find a fabled treasure",
	" to rescue a captive",
	"because you were bored"
];
const stages = ["manor grounds", "manor's ground floor", "dungeons", "crypts"];

const enemies = [
	["skeletal warrior", 20, "rusty axe"],
	["ghoul", 25, "claws"],
	["ghost", 15, "spectral blade"],
	["obligatory giant rat", 10, "fangs"]
];

module.exports = { commands, items, weapons, enemies, goals, stages };
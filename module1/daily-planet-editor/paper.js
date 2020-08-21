// Written by Kent, Clark

const enemies = ["Lex", "Batman", "Darkseid", "Brainiac", "General Zod", "Doomsday"];

function whoWins(kryptonite, enemyName) {
	if (!kryptonite) {
		return "Superman beats " + enemyName + ", of course.";
	} else {
		return "Depends on how quick Superman can get rid of the Kryptonite. " + enemyName + " could possibly win this one.";
	}
    }

for (let i = 0; i < enemies.length; ++i) {
	let kryptonite;
	if (i % 2 === 0) {
		kryptonite = true;
	} else {
		kryptonite = false;
	}
	console.log(whoWins(kryptonite, enemies[i]));
}

function attraction() {
	// 1 is not at all attracted, 10 is "super" attracted...
	return Math.floor((Math.random() * 10) + 1);
}

console.log(attraction());

let superman = false;
while (!superman){
	console.log("I'm just a nerdy columnist.");
	if (Math.random() >= 0.5) {
		superman=true;
		console.log("Now I'm Superman!");
	}
}

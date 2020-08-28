class Player {
	constructor(name) {
		this.setName(name);
		this.coins = 0;
		this.status = "big";
		this.hasStar = false;
		this.gameActive = true;
	}
	
	setName(namePicked) {
		if (namePicked !== "Luigi") {
			this.name = "Mario";
		} else {
			this.name = namePicked;
		}
	}
	
	gotHit() {
		switch (this.status) {
			case "powered up": {
				this.status = "big";
			}
			break;
			
			case "big": {
				this.status = "small";
			}
			break;
			
			case "small": {
				this.status = "dead";
				this.gameActive = false;
			}
			break;
		}
	}
	
	gotPowerUp() {
		switch (this.status) {
			case "small": {
				this.status = "big";
			}
			break;
			
			case "big": {
				this.status = "powered up";
			}
			break;
			
			case "powered up": {
				this.hasStar = true;
			}
			break;
		}
	}
	
	addCoin() {
		++this.coins;
	}
	
	print() {
		console.log(`
			Name: ${this.name}
	Coins: ${this.coins}
	status: ${this.status}
	star: ${this.hasStar}
		`);
	}
	
}

let player = new Player("Luigi");
function randomEvent() {
	let n = Math.round(Math.random() * 2);
	if (n === 0) {
		player.gotHit();
	} else if (n === 1) {
		player.gotPowerUp();
	} else {
		player.addCoin();
	}
	player.print();
}

let intervalId = setInterval(() => {
	randomEvent();
	if (player.gameActive === false) {
		clearInterval(intervalId);
	}
}, 1000);
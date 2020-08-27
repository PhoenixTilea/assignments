const clickCount = document.getElementById("click-count");
const sessionCount = document.getElementById("session-count");
const timer = document.getElementById("timer");
const message = document.getElementById("message");

let intervalId;
let time = 10;
let clicks;
let sessions;
if (localStorage.clicks) {
	clicks = parseInt(localStorage.clicks);
	sessions = parseInt(localStorage.sessions);
} else {
	clicks = 0;
	sessions = 0;
}

clickCount.textContent = clicks;
sessionCount.textContent = sessions;

document.addEventListener("click", start);

function start() {
	timer.textContent = time;
	message.textContent = "Click!";
	document.removeEventListener("click", start);
	document.addEventListener("click", addClick);
	intervalId = setInterval(function () {
		--time;
		timer.textContent = time;
		if (time === 0) {
			stop();
		}
	}, 1000);
}

function addClick() {
	++clicks;
	clickCount.textContent = clicks;
}

function stop() {
	clearInterval(intervalId);
	document.removeEventListener("click", addClick);
	clickCount.textContent = clicks;
	sessionCount.textContent = ++sessions;
	message.textContent = "Times up! Refresh the page to keep adding clicks.";
	
	localStorage.clicks = clicks;
	localStorage.sessions = sessions;
}
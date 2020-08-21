const square = document.getElementById("square");
const alertBox = document.getElementById("alert");

square.addEventListener("mouseover", () => changeColor("blue"));
square.addEventListener("mousedown", () => changeColor("red"));
square.addEventListener("mouseup", () => changeColor("yellow"));
square.addEventListener("dblclick", () => changeColor("green"));
window.addEventListener("scroll", () => changeColor("orange"));
window.addEventListener("keydown", (e) => {
	let color;
	switch (e.which) {
		case 66:
			color = "blue";
			break;
		case 71:
			color = "green";
			break;
		case 79:
			color = "orange";
			break;
		case 82:
			color = "red";
			break;
		case 89:
			color = "yellow";
			break;
	}
	if (color) {
		changeColor(color);
	}
});

function changeColor(color) {
	square.style.backgroundColor = color;
		if (alertBox.textContent !== color) {
		alertBox.textContent = color;
		}
}
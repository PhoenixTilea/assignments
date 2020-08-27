const f = document.pests;
f.addEventListener("submit", function (e) {
	e.preventDefault();
	
	let g = parseInt(f.goombas.value);
	let b = parseInt(f.bobombs.value);
	let c = parseInt(f.cheepCheeps.value);
let total = (g * 5) + (b * 7) + (c * 11);

document.getElementById("total").textContent = total;

f.goombas.value = 0;
f.bobombs.value = 0;
f.cheepCheeps.value = 0;
});
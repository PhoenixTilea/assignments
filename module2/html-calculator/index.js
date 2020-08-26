const addForm = document.forms.add;
const subForm = document.forms.sub;
const mulForm = document.forms.mul;

addForm.addEventListener("submit", add);
subForm.addEventListener("submit", sub);
mulForm.addEventListener("submit", mul);

function add(e) {
	e.preventDefault();
	let num1 = addForm.num1;
	let num2 = addForm.num2;
	document.getElementById("add-result").textContent = parseInt(num1.value) + parseInt(num2.value);
	num1.value = 0;
	num2.value = 0;
}

function sub(e) {
	e.preventDefault();
	
	let num1 = subForm.num1;
	let num2 = subForm.num2;
	document.getElementById("sub-result").textContent = parseInt(num1.value) - parseInt(num2.value);
	num1.value = 0;
	num2.value = 0;
}

function mul(e) {
	e.preventDefault();
	
	let num1 = mulForm.num1;
	let num2 = mulForm.num2;
	document.getElementById("mul-result").textContent = parseInt(num1.value) * parseInt(num2.value);
	num1.value = 0;
	num2.value = 0;
}
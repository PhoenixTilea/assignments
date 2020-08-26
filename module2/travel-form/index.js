const f = document.travelForm;
f.addEventListener("submit", e => {
	e.preventDefault();
	
	let boxes = f.diet;
	let diet;
	for (let i = 0; i < boxes.length; ++i) {
		if (!boxes[i].checked) {
			continue;
		}
		if (!diet) {
			diet = boxes[i].value;
		} else {
			diet += `, ${boxes[i].value}`;
		}
	}
	if (!diet) {
		diet = "none";
	}
	
	let report = `Name: ${f.firstName.value} ${f.lastName.value}
		Age: ${f.age.value}
		Gender: ${f.gender.value}
		Dietary Restrictions: ${diet}
		
		Great. We'll figure something out.
	`;
	
	alert(report);
});
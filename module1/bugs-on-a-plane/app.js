var form = document.getElementById("airline-form");
var submit = document.getElementById("submit");

function formAlert(e) {
	e.preventDefault();
	
    var firstName = form["first-name"].value;
    var lastName = form["last-name"].value;
    var age = form["age"].value;
    var gender = form.gender.value;
    var location = form["travel-location"].value;
    var diet = [];
    if (form.vegan.checked) {
        diet.push(form.vegan.value);
    }
    if (form.gluten.checked) {
        diet.push(form.gluten.value);
    }
    if (form.paleo.checked) {
        diet.push(form.paleo.value);
    }


    alert("First Name: " + firstName + "\nLast Name: " + lastName + "\nAge: " + age + "\nGender: " + gender + "\nTravel Location: " + location + "\nDiet: " + diet + "\nAwesome, now if you die, it won't be an accident...");
}


submit.addEventListener("click", formAlert);
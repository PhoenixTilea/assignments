const list = document.getElementById("pokemon-list");
const xhr = new XMLHttpRequest();

xhr.onreadystatechange = () => {
	if (xhr.readyState === 4 && xhr.status === 200) {
		let data = JSON.parse(xhr.responseText).objects[0].pokemon;
		data.forEach(pokemon => {
			let li = document.createElement("li");
			li.textContent = pokemon.name;
			list.appendChild(li);
		});
	}
};

xhr.open("GET", "https://api.vschool.io/pokemon", true);
xhr.send();
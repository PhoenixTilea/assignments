const products = [
	{
		name: "Canvas Tent",
		price: "15 gp",
		description: "Trancing under the stars all night is a wonderful feeling, but the weather and giant insects sometimes have other ideas. This sturdy, waterproof tent offers protection, privacy, and a cozy place to call your own even in the most remote landscapes."
	},
	{
		name: "Arrows (x20)",
		price: "1 GP",
		description: "Even for the peace-loving amungst us, it is sometimes necessary to be able to put holes in things from a distance, or at least to look like you could. Stock up with our twenty-count bundle of sturdy steel-tipped arrows and never be caught unarmed for any situation."
	},
	{
		name: "Woolen Socks",
		price: "1 sp",
		description: "The most important thing for any traveler: a clean and dry pair of socks. Seriously, never underestimate just how much better traversing the wilderness will feel if you always have a fresh set to hand. Trust us: you can never have too many socks!"
	},
	{
		name: "Soap",
		price: "1 cp",
		description: "This one should go without saying. There won't always be a cozy in with a hot bath or a pure spring to wash away the grime and gore of the day's adventure. We have plenty of scents from which to choose, from spring flowers, to fresh pine, to elderberry-nut smoothie."
	},
	{
		name: "Bag of Ball Barings (x1000)",
		price: "1 gp",
		description: "'For what do I need a thousand metal ball barings?' you ask yourself indignantly? The answer is: everything! Use them to lay traps, misdirect distractable creatures, prank your friends, play marbles, pelt pesky pigmy gnomes, eat when you're bored, and so much more!"
	}
];

const t = document.getElementById("product-list");
products.forEach(product => {
	let tr = document.createElement("tr");
	let name = document.createElement("td");
	let price = document.createElement("td");
	let desc = document.createElement("td");
	
	name.className = "product-name";
	name.textContent = product.name;
	
	price.className = "product-price";
	price.textContent = product.price;
	
	desc.className = "product-description";
	desc.textContent = product.description;
	
	tr.appendChild(name);
	tr.appendChild(price);
	tr.appendChild(desc);
	t.appendChild(tr);
});
const todo = {};
const baseUrl = "https://api.vschool.io/sabelyn/todo/";

axios.get(baseUrl).then(response => {
	buildTodoList(response.data);
});

const list = document.getElementById("todo-list");

function buildTodoList(todoItems) {
	todoItems.forEach(createTodoItem);
}

function createTodoItem(item) {
	todo[item._id] = item;
	
	let li = document.createElement("li");
	li.setAttribute("id", item._id);
	if (item.completed) {
		li.classList.add("completed");
	}
	
	let title = document.createElement("h3");
	title.textContent = item.title;
	
	let img = document.createElement("img");
	img.setAttribute("src", item.imgUrl || "");
	img.setAttribute("width", "50px");
	img.setAttribute("height", "50px");
	
	let desc = document.createElement("p");
	desc.textContent = item.description || "No description";
	
	let price =  document.createElement("div");
	if (item.price) {
		price.textContent = "$" + (Math.round(item.price * 100) / 100);
	}
	
	let comp = document.createElement("input");
	comp.setAttribute("type", "checkbox");
	comp.value = "complete";
	comp.checked = item.completed;
	comp.addEventListener("change", updateItemCompletion);
		
		let edit = document.createElement("button");
		edit.textContent = "Edit";
		edit.addEventListener("click", showEditForm);
		
		let del = document.createElement("button");
		del.textContent = "X";
		del.setAttribute("title", "Delete");
		del.addEventListener("click", deleteItem);
		
		li.appendChild(comp);
		li.appendChild(img);
		li.appendChild(title);
		li.appendChild(price);
		li.appendChild(edit);
		li.appendChild(del);
		li.appendChild(desc);
		list.appendChild(li);
}

// ==========
// Form Operations
// ==========

const addForm = document.todoForm;
addForm.addEventListener("submit", addNewItem);

function clearForm() {
	addForm.title.value = "";
	addForm.description.value = "";
	addForm.price.value = "0.00";
	addForm.img.value = "";
}

function showEditForm(e) {
	const li = e.target.parentNode;
	const id = li.getAttribute("id");
	const item = todo[id];
	const title = li.children[2];
	const price = li.children[3];
	const edit = li.children[4];
	const desc = li.lastChild();
	
	const titleField = document.createElement("input");
	titleField.setAttribute("type", "text");
	titleField.setAttribute("id", "title-field");
	titleField.value = item.title;
	
	const priceField = document.createElement("input");
	priceField.setAttribute("type", "number");
	priceField.setAttribute("id", "price-field");
	priceField.setAttribute("min", "0.00");
	priceField.value = item.price || "0.00";
	priceField.setAttribute("step", "0.01");
	
	const descField = document.createElement("textarea");
	descField.setAttribute("id", "desc-field");
	descField.value = item.description || "";
	
	const save = document.createElement("button");
	save.textContent = "Save";
	save.addEventListener("click", () => {
		let newTitle = titleField.value.trim();
		let newPrice = parseFloat(priceField.value);
		let newDesc = descField.value.trim();
		
		let data = {};
		if (newTitle && newTitle !== item.title) {
			data.title = newTitle;
		}
		if (!Number.isNaN(newPrice) && newPrice !== item.price) {
			data.price = newPrice;
		}
		if (newDesc !== item.description) {
			data.description = newDesc;
		}
		
		axios.put(baseUrl + id, data).then(response => {
		let updated = response.data;
		title.textcontent = updated.title;
		if (updated.price && updated.price > 0.00) {
			price.textContent = "$" + price;
		} else {
			price.textContent = "";
		}
		desc.textContent = updated.description || "";
		
			li.removeChild(titleField);
			li.removeChild(priceField);
			li.removeChild(save);
			li.removeChild(descField);
			title.hidden = false;
			price.hidden = false;
			edit.hidden = false;
			desc.hidden = false;
		});
	});
	
	title.hidden = true;
	li.insertBefore(titleField, title);
	price.hidden = true;
	li.insertBefore(priceField, price);
	edit.hidden = true;
	li.insertBefore(edit, save);
	desc.hidden = true;
	li.appendChild(descField);
}

// ==========
// Adding/Editing Items
// ==========

function addNewItem() {
	let newItem = {};
	newItem.title = addForm.title.value;
	if (addForm.description.value) {
		newItem.description = addForm.description.value;
	}
	let price = parseFloat(addForm.price.value);
	if (!Number.isNaN(price) && price > 0.00) {
		newItem.price = price;
	}
	if (addForm.img.value) {
		newItem.imgUrl = addForm.img.value;
	}
	
	axios.post(baseUrl, newItem).then(response => createTodoItem(response.data));
	clearForm();
}

function updateItemCompletion(e) {
	let box = e.target;
	let li = box.parentNode;
	let id = li.getAttribute("id");
	
	axios.put(baseUrl + id, { completed: box.checked });
	todo[id].completed = box.checked;
	li.classList.toggle("completed");
}

function deleteItem(e) {
	let id = e.target.parentNode.getAttribute("id");
	axios.delete(baseUrl + id);
	list.removeChild(e.target.parentNode);
	delete todo[id];
}
const add = document.addItem;
const list = document.getElementById("list");
let savedList;
if (localStorage.momsShoppingList) {
	savedList = JSON.parse(localStorage.momsShoppingList).list;
	savedList.forEach(item => addItem(item, true));
} else {
	savedList = [];
}

add.addEventListener("submit", function (e) {
	e.preventDefault();
	addItem(add.title.value);
});

function addItem(itemName, fromStorage = false) {
	let li = document.createElement("li");
	let item = document.createElement("div");
	item.textContent = itemName;
	
	let edit = document.createElement("button");
	let del = document.createElement("button");
	
	edit.textContent = "Edit";
	edit.addEventListener("click", editItem);
	edit.setAttribute("aria-label", "edit " + itemName);
	
	del.textContent = "X";
	del.title = "Delete";
	del.addEventListener("click", deleteItem);
	del.setAttribute("aria-label", "delete " + itemName);
	
	li.appendChild(item);
	li.appendChild(edit);
	li.appendChild(del);
	
	list.insertBefore(li, list.firstChild);
	
	if (!fromStorage) {
		add.title.value = "";
		savedList.unshift(itemName);
		save();
	}
}

function editItem(e) {
	let li = e.target.parentNode;
	
	let itemName = li.firstChild.textContent;
	
	let editBox = document.createElement("input");
	editBox.type = "text";
	editBox.value = itemName;
	
	let saveBtn = document.createElement("button");
	saveBtn.textContent = "Save";
	saveBtn.addEventListener("click", (e) => commitEdit(e, itemName));
	
	li.firstChild.textContent = "";
	li.firstChild.appendChild(editBox);
	li.children[1].hidden = true;
	li.insertBefore(saveBtn, li.lastChild);
}

function commitEdit(e, oldName) {
	let li = e.target.parentNode;
	let div = li.firstChild;
	let newName = div.firstChild.value;
	div.removeChild(div.firstChild);
	div.textContent = newName;
	
	li.removeChild(li.children[2]);
	li.children[1].hidden = false;
	
	savedList[savedList.indexOf(oldName)] = newName;
	save();
}

function deleteItem(e) {
	let deleted = e.target.parentNode.firstChild.textContent;
	list.removeChild(e.target.parentNode);
	
	savedList = savedList.filter(item => item !== deleted);
	save();
}

function save() {
	localStorage.momsShoppingList = JSON.stringify({list: savedList });
}
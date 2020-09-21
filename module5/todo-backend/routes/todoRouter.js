const express = require("express");
const uniqid = require("uniqid");
const { todos } = require("../data.json");
todos.forEach(todo => todo._id = uniqid());

const todoRouter = express.Router();
todoRouter.route("/")
.get((req, res) => res.send(todos))
.post((req, res) => {
	const todo = req.body;
	todo._id = uniqid();
	todos.push(todo);
	res.send({message: "Success!", todo: todo});
});

todoRouter.route("/:id")
.get((req, res) => res.send(todos.find(todo => todo._id === req.params.id)))
.put((req, res) => {
	const data = req.body;
	const index = todos.findIndex(todo => todo._id === req.params.id);
	if (index >= 0 && data) {
		todos[index] = {...todos[index], ...data};
		res.send({message: "Updated successfully", todo: todos[index]});
	} else {
		res.send("Update failed");
	}
})
.delete((req, res) => {
	const index = todos.findIndex(todo => todo._id === req.params.id);
	if (index >= 0) {
		todos.splice(index, 1);
		res.send("Delete successful");
	} else {
		res.send("Invalid id");
	}
});

module.exports = todoRouter;
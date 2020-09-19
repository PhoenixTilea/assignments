const express = require("express");
const uniqid = require("uniqid");

const bounties = [
{firstname: "Darth", lastname: "Malificus", living: true, amount: 10000, type: "Sith", _id: uniqid()},
{firstname: "Ran", lastname: "Abadi", living: true, amount: 8000, type: "Jedi", _id: uniqid()},
{firstname: "Akin", lastname: "Lus", living: false, amount: 12000, type: "Sith", _id: uniqid()},
{firstname: "Darth", lastname: "Dingis", living: true, amount: 20000, type: "Sith", _id: uniqid()},
{firstname: "Yata", lastname: "Mistiv", living: true, amount: 15000, type: "Jedi", _id: uniqid()},
{firstname: "Vas", lastname: "Brin", living: false, amount: 5000, type: "Sith", _id: uniqid()}
];

const bountyRouter = express.Router();
bountyRouter.route("/")
.get((req, res) => res.send(bounties))
.post((req, res) => {
	const newBounty = req.body;
	newBounty.id = uniqid();
	bounties.push(newBounty);
	res.send(`${newBounty.firstname} ${newBounty.lastname} added successfully.`);
});

bountyRouter.route("/:id")
.get((req, res) => {
	const found = bounties.find(b => b._id === req.params.id);
	res.send(found);
})
.put((req, res) => {
	const found = bounties.find(b => b._id === req.params.id);
	if (found) {
		for (let key in req.body) {
			found[key] = req.body[key];
		}
		res.send(`${found.firstname} ${found.lastname} was successfully updated.`);
	} else {
		res.send("Invalid bounty id");
	}
})
.delete((req, res) => {
	const index = bounties.findIndex(b => b._id === id);
	if (index >= 0) {
		const deleted = bounties.splice(index, 1);
		res.send(`${deleted.firstname} ${deleted.lastName} was successfully removed.`);
	} else {
		res.send("Invalid bounty id.");
	}
});

module.exports = bountyRouter;
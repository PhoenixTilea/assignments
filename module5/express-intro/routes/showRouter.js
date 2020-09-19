const express = require("express");
const uniqid = require("uniqid");

const shows = [
	{_id: uniqid(), title: "Game of Thrones", genre: "Fantasy"},
	{_id: uniqid(), title: "The Office", genre: "Sitcom"},
	{_id: uniqid(), title: "Dragonball Z", genre: "Anime"},
	{_id: uniqid(), title: "Breaking Bad", genre: "Drama"}
];

const showRouter = express.Router();
showRouter.route("/")
	.get((req, res) => res.send(shows))
	.post((req, res) => {
		const newShow = req.body;
		newShow._id = uniqid();
		shows.push(newShow);
		res.send(`${newShow.title} was added successfully.`);
	});	

module.exports = showRouter;
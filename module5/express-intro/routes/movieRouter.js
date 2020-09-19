const express = require("express");
const uniqid = require("uniqid");

const movieRouter = express.Router();
const movies = [
	{_id: uniqid(), title: "Harry Potter and the Sorcerer's Stone", genre: "Fantasy"},
		{_id: uniqid(), title: "Die Hard", genre: "Action"},
			{_id: uniqid(), title: "Cabin in the Woods", genre: "Horror"},
				{_id: uniqid(), title: "The Secret Life of Pets", genre: "Comedy"}
];

movieRouter.route("/")
	.get((req, res) => {res.send(movies)})
	.post((req, res) => {
		const newMovie = req.body;
		newMovie._id = uniqid();
		movies.push(newMovie);
		res.send(`${newMovie.title} was successfully added.`);
	});

module.exports = movieRouter;
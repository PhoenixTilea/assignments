const express = require("express");
const Movie = require("../models/Movie");

const movieRouter = express.Router();

movieRouter.route("/")
	.get((req, res, next) => {
		req.query = req.query || {};
		Movie.find(req.query, (err, movies) => {
			if (err) {
				res.status(500);
				return next(err);
			} else {
				return res.status(200).send(movies);
			}
		});
	})
	.post((req, res, next) => {
		const newMovie = new Movie(req.body);
		newMovie.save((err, movie) => {
			if (err) {
				res.status(500);
				return next(err);
			} else {
				return res.status(201).send(movie);
			}
		});
	});

movieRouter.route("/:id")
.get((req, res, next) => {
	
})
.put((req, res, next) => {
	Movie.findOneAndUpdate({_id: req.params.id}, req.body, {new: true},
	(err, movie) => {
		if (err) {
			res.status(500);
			return next(err);
		} else {
			return res.status(200).send(movie);
		}
	});
})
.delete((req, res, next) => {
	Movie.findOneAndDelete({_id: req.params.id}, (err, movie) => {
		if (err) {
			res.status(500);
			return next(err);
		} else {
			return res.status(200).send(`successfully deleted ${movie.title}`);
		}
	});
});
module.exports = movieRouter;
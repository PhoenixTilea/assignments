const express = require("express");
const Campaign = require("../models/Campaign");
const Character = require("../models/Character");

const campaignRouter = express.Router();

campaignRouter.route("/")
// Returns all campaigns belonging to the user or to which they have access
.get((req, res, next) => {
	const userId = req.user._id;
	Campaign.find({$or: [{dm: userId}, {players: userId}]}, (err, campaigns) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		return res.status(200).send(campaigns);
	});
})
.post((req, res, next) => {
	const cam = req.body;
	cam.dm = req.user._id;
	const newCampaigng = new Campaign(cam);
	newCampaign.save((err, savedCam) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		return res.status(201).send(savedCam);
	});
});

campaignRouter.route("/:camId")
.get((req, res, next) => {
	const {camId} = req.params;
	const user = req.user._id;
	Campaign.findOne({_id: camId, dm: user}, (err, campaign) => {
		if (err) {
			res.status(500);
			return next(err);
		} else if (!campaign) {
			res.status(404);
			return next(new Error("Campaign not found>"));
		}
		Character.find({campaign: camId}, (err, characters) => {
			if (err) {
				res.status(500);
				return next(err);
			}
			return res.status(200).send({campaign, characters});
		});
	});
})
.put((req, res, next) => {
	const user = req.user._id;
	Campaign.findOneAndUpdate({_id: req.params.camId, dm: user}, req.body, {new: true}, (err, campaign) => {
		if (err) {
			res.status(500);
			return next(err);
		}
		return res.status(200).send(campaign);
	});
})
.delete((req, res, next) => {
	const camId = req.params.camId;
	const user = req.user._id;
	Campaign.findOneAndDelete({_id: camId, dm: user}, (err, campaign) => {
		if (err) {
			res.status(500);
			return next(err);
		} else if (!campaign) {
			res.status(404);
			return next(new Error("Campaign not found."));
		}
		Character.updateMany({campaign: camId}, {campaign: null}, {new: true}, (err, chars) => {
			if (err) {
				res.status(500);
				return next(err);
			}
			return res.status(200).send({message: "Success!"});
		});
	});
});



module.exports = campaignRouter;
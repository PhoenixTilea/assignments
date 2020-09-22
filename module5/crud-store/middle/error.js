module.exports = (err, req, res, next) => {
	console.log(err.message);
	return res.send({error: err.message});
};
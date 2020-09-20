module.exports = function (req, res, next) {
	req.body = {prop: "Gotcha"};
	next();
}
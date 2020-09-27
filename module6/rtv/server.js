const express = require("express");
const expressJwt = require("express-jwt");
const mongoose = require("mongoose");
const morgan = require("morgan");

mongoose.connect("mongodb://localhost:27017/rtv-db",
	{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false},
).then(() => console.log("Connected to the database"))
.catch(err => console.error(err));

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use("/protected", expressJwt({secret: process.env.SECRET, algorithms: ["RS256"]}));
app.use("/auth", require("./routes/authRouter"));
app.use("/issues", require("./routes/issueRouter"));

app.use((err, req, res, next) => {
	if (err.name === "UnauthorizedError") {
		res.status(err.status);
	}
	console.error(err.message);
	res.send({error: err.message});
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`The server is listening on port ${port}`));
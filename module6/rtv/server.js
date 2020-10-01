const express = require("express");
const expressJwt = require("express-jwt");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();

mongoose.connect(
	/*process.env.DB_URL ||*/ "mongodb://localhost:27017/rtv-db",
	{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false},
).then(() => console.log("Connected to the database"))
.catch(err => console.error(err));

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use("/auth", require("./routes/authRouter"));
app.use("/issues", require("./routes/issueRouter"));
app.use("/comments", require("./routes/commentRouter"));
app.use("/user", require("./routes/userRouter"));

// Protected routes
app.use("/protected", expressJwt({secret: process.env.SECRET, algorithms: ["HS256"]}));
app.use("/protected/issues", require("./routes/protectedIssueRouter"));
app.use("/protected/comments", require("./routes/protectedCommentRouter"));
app.use("/protected/user", require("./routes/protectedUserRouter"));

app.use((err, req, res, next) => {
	if (err.name === "UnauthorizedError") {
		res.status(err.status);
	}
	console.error(err.message);
	res.send({error: err.message});
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`The server is listening on port ${port}`));
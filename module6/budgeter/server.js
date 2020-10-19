const express = require("express");
const expressJwt = require("express-jwt");
const morgan = require("morgan");
require("dotenv").config();
require("mongoose").connect(process.env.DB_URL,
{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}
).then(() => console.log("Connected to the database"))
.catch(err => console.error(err));

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use("/auth", require("./routes/authRouter"));

// Protected Routes
app.use("/api", expressJwt({secret: process.env.SECRET, algorithms: ["HS256"]}));
app.use("/api/user", require("./routes/userRouter"));
app.use("/api/accounts", require("./routes/accRouter"));
app.use("/api/transactions", require("./routes/transRouter"));
app.use("/api/expenses", require("./routes/expenseRouter"));

// Errors
app.use((err, req, res, next) => {
	if (err.name === "UnauthorizedError") {
		res.status(err.status);
	}
	console.error(err.message);
	return res.send({error: err.message});
});

const port = process.env.PORT;
app.listen(port, () => console.log(`The server is listening on port ${port}`));
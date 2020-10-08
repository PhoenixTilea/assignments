const express = require("express");
const expressJwt = require("express-jwt");
const morgan = require("morgan");
require("dotenv").config();
require("mongoose").connect(process.env.DB_URL,
	{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}
).then(() => console.log("Connected to the database"))
.catch(err => console.log(err));

const app = express();
app.use(morgan("dev"));
app.use(express.json());

// Public routes
app.use("/auth", require("./routes/authRouter"));


// Protected routes
app.use("/api", expressJwt({secret: process.env.SECRET, algorithms: ["HS256"]}));
app.use("/api/campaigns", require("./routes/campaignRouter"));
app.use("/api/characters", require("./routes/charRouter"));
app.use("/api/montypes", require("./routes/monTypeRouter"));
app.use("/api/monsters", require("./routes/monsterRouter"));

// Error handling
app.use((err, req, res, next) => {
	if (err.name === "UnaturhoizedError") {
		res.status(err.status);
	}
	console.log(err.message);
	return res.send({error: err.message});
});

const port = process.env.PORT;
app.listen(port, () => console.log(`the server is listening on local port ${port}`));
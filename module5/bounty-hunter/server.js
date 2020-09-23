const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

mongoose.connect("mongodb://localhost:27017/bountydb",
	{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }
).then(() => console.log("Connected to database"))
.catch(err => console.log(err));

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use("/bounties", require("./routes/bountyRouter"));
app.use(require("./middle/error"));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`the server is running on port ${port}`));
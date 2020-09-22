const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/movies-db",
{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false },
).then(() => console.log("Connected to the database"))
.catch(err => console.log(err));

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use("/movies", require("./routes/movieRouter"));
app.use("/shows", require("./routes/showRouter"));
app.use(require("./middle/error"));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`The server is running on port ${port}`));
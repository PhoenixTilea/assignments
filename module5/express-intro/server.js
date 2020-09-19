const express = require("express");
const movieRouter = require("./routes/movieRouter");
const showRouter = require("./routes/showRouter");
const app = express();

app.use(express.json());
app.use("/movies", movieRouter);
app.use("/shows", showRouter);

app.get("/", (req, res) => res.send("Running..."));

app.listen(8000, () => console.log("The server is running on port 8000"));
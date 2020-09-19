const express = require("express");

const app = express();

app.use(express.json());
app.use("/bounties", require("./routes/bountyRouter"));

app.listen(8000, () => console.log("The server is running on port 8000."));
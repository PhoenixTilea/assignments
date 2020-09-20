const express = require("express");

const app = express();
app.use(express.json());
app.use("/things", require("./routes/thingRouter"));

app.listen(8000, () => console.log("The server is running on port 8000"));
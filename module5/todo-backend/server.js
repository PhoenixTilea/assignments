const express = require("express");
const app = express();

app.use(express.json());
app.use("/todo", require("./routes/todoRouter"));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`The server is running on port ${port}`));
const cors = require("cors");
const express = require("express");
const connectDB = require("./mongodb");
const Users = require("./Routers/Users");
const Orders = require("./Routers/Orders");
const Actions = require("./Routers/Actions");

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
const port = 9000;

connectDB();

app.use("/users", Users);
app.use("/orders", Orders);
app.use("/actions", Actions);

app.listen(port, () => console.log(`Server started on port ${port}`));
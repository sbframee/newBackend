const cors = require("cors");
const express = require("express");
const connectDB = require("./mongodb");
const Users = require("./Routers/Users");
const Orders = require("./Routers/Orders");
const Categories = require("./Routers/Categories");
const Category_names = require("./Routers/Category_names");
const Customers = require("./Routers/Customers");
const Groups = require("./Routers/Groups");
const Items = require("./Routers/Items");
const Suppliers = require("./Routers/Suppliers");

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
const port = 9000;

connectDB();

app.use("/users", Users);
app.use("/orders", Orders);
app.use("/categories", Categories);
app.use("/category_names", Category_names);
app.use("/customers", Customers);
app.use("/groups", Groups);
app.use("/items", Items);
app.use("/suppliers", Suppliers);
app.use('/uploads', express.static('uploads'));

app.listen(port, () => console.log(`Server started on port ${port}`));
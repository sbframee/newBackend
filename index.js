const cors = require("cors");
const express = require("express");
const connectDB = require("./mongodb");
const Users = require("./Routers/Users");
const Orders = require("./Routers/Orders");
const Categories = require("./Routers/Categories");
const Category_names = require("./Routers/Category_names");
const Customers = require("./Routers/Customers");
const Customer_Groups = require("./Routers/Customer_Groups");
const Items = require("./Routers/Items");
const Item_Groups = require("./Routers/Item_Groups");

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
app.use("/groups", Customer_Groups);
app.use("/items", Items);
app.use("/item_groups", Item_Groups);

app.listen(port, () => console.log(`Server started on port ${port}`));
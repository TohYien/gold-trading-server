const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 5000;
const cors = require("cors");
const connectDB = require("./connection");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/user", require("./controllers/user"));
app.use("/products", require("./controllers/carts"));
app.use("/carts", require("./controllers/carts"));
app.use("/orders", require("./controllers/orders"));

connectDB();
app.listen(PORT, () => console.log(`App is flying on PORT: ${PORT}`));

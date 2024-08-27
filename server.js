const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 5000;
const cors = require("cors");
const connectDB = require("./connection");
const path = require("path");

app.use(cors());
app.use(express.json());
// To parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/user", require("./controllers/user"));
app.use("/products", require("./controllers/carts"));
app.use("/carts", require("./controllers/carts"));
app.use("/orders", require("./controllers/orders"));

connectDB();
app.listen(PORT, () => console.log(`App is flying on PORT: ${PORT}`));

const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
product: { type: String },
description: { type: String },
amount: { type: Number },
price: { type: Number },
goldOrSilver: {type: Number}, 
tradeNumber: { type: Number }, //if 1 its buy then 2 its sell
});

module.exports = mongoose.model("Cart", CartSchema);

const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	total: { type: Number },
	purchased_date: { type: Date, default: Date.now },
	items: [
		{
			product: { type: String },
			description: { type: String },
			amount: { type: Number },
			price: { type: Number },
			goldOrSilver: {type: Number}, 
			tradeNumber: { type: Number }, //if 1 its buy then 2 its sell
			subtotal: { type: Number },
			_id: false,
		},
	],
});

module.exports = mongoose.model("Order", OrderSchema);

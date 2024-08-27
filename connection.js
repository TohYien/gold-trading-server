const mongoose = require("mongoose");
require("dotenv").config();

const { DB_NAME,DB_URL } = process.env;
const connect = async () => {
	try {
		await mongoose.connect(`${DB_URL}`);
		console.log("Connected to MongoDB");
	} catch (e) {
		console.error(`Error connectiong to MongoDB: ${e.message}`);
	}
};

module.exports = connect;

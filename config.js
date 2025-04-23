require('dotenv').config();
const mongoose = require("mongoose");


const db_url = process.env.DATABASE_URL;


const ConnectDB = async () => {
  return await mongoose
    .connect(db_url)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
};

module.exports = ConnectDB;

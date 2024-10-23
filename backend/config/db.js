// backend/config/db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const URI = "mongodb://127.0.0.1:27017/"


const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("MongoDB connected!");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};

module.exports = connectDB;

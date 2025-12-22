const mongoose = require('mongoose');
require("dotenv").config();
const MONGODB_URL_LOCAL = process.env.MONGODB_URL_LOCAL;
// const mongoDBURL = process.env.DB_URL;

const connectDB = async () => {
    try{
        await mongoose.connect(MONGODB_URL_LOCAL);
        console.log("MongoDB DB connected Successfully");

        mongoose.connection.on('error', (err) => {
            console.error(`MongoDB connection error`, err)
        });
    }catch(err){
        console.error("Failed to connect to MongoDB:",err);
        process.exit(1);
    }
}

module.exports = connectDB;
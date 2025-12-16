const mongoose = require('mongoose');

const mongoDBURL = 'mongodb://127.0.0.1:27017/firstdb';

const connectDB = async () => {
    try{
        await mongoose.connect(mongoDBURL);
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
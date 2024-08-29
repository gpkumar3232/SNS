const mongoose = require('mongoose');

function connectDB() {
    // MongoDB connection
    mongoose.connect('mongodb+srv://Gpkumar:gpkumar32@cluster0.vipoq7o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

    // Check for DB connection
    mongoose.connection.once('open', () => {
        console.log('Connected to MongoDB');
    });
}

module.exports.connectDB = connectDB;
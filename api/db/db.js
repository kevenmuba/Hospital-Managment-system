// db.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/myDatabase'; // Use your MongoDB URI
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
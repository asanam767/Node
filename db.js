const mongoose = require('mongoose');
//establishing connection
// Define the MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels';

// Set up MongoDB connection
mongoose.connect(mongoURL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

const db = mongoose.connection;

// Export your database connection
module.exports = db;

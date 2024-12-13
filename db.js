// const mongoose = require('mongoose');
// //establishing connection
// // Define the MongoDB connection URL
// const mongoURL = 'mongodb://localhost:27017/hotels';

// // Set up MongoDB connection
// mongoose.connect(mongoURL)
//     .then(() => console.log('Connected to MongoDB'))
//     .catch((err) => console.error('Failed to connect to MongoDB', err));

// const db = mongoose.connection;

// // Export your database connection
// module.exports = db;



const mongoose = require("mongoose");
const url = 'mongodb://localhost:27017/hotels';

async function mongodbconnection(url){
    return mongoose.connect(url)
}

module.exports = {
    mongodbconnection
}

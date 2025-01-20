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
//this is my local url , where we are connecting to the local database
// const url = 'mongodb://localhost:27017/hotels';
//here we are connecting to the online cluster that we have set up - used in deploying 
const url="mongodb+srv://asanam767:<saiprasanna767>@cluster0.aqddc.mongodb.net/"

async function mongodbconnection(url){
    return mongoose.connect(url)
}

module.exports = {
    mongodbconnection
}

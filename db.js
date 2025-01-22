const mongoose = require("mongoose");
require("dotenv").config();

// Get the MongoDB connection string from the .env file
// const mongoURL = process.env.DB_URL;
const mongoURL=process.env.DB_URL_LOCAL;

// Function to establish MongoDB connection
async function mongodbconnection() {
  return mongoose.connect(mongoURL)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ Failed to connect to MongoDB", err));
}

// Export the connection function
module.exports = { mongodbconnection };


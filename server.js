const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { mongodbconnection } = require("./db.js");
const { userdetails, getdetails } = require("./controllers/user.js");

//also known as username and passport startegy 
//used to authenitcate users
//here since we have created a separate file -auth.js , we will be requiring the same
const passport=require('./auth.js');


require("dotenv").config();

// ✅ Connect to MongoDB
mongodbconnection().then(() => {
  console.log("✅ Database Connected");
}).catch(err => console.error("❌ Database Connection Failed:", err));

app.use(bodyParser.json());

// Routes
app.get("/hello", (req, res) => {
  res.send("katta manasa");
});

//to implement middleware , we use a middleware function 
// Think of it as a checkpoint that every request must pass through before getting a response!
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
  next();
};

//implement logrequest for all endpoints:
app.use(logRequest);

//we need to decide which route to authenticate
app.use(passport.initialize());
//since we need to reduce the complexity - let us put this authentication in the form of a middleware
//so store it in a separate variable
const localAuthMiddleware=passport.authenticate('local',{session:false});

//passing middleware in between 
//this is done to get the details of date,time only for "/ endpoint"
// app.get("/",logRequest, function (req, res) {
  app.get("/", function (req, res) {
  res.send("Welcome to my hotel... How I can help you?");
});

app.get("/getdetail", getdetails);
app.post("/persondetail", userdetails);

// Import and use routers
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");

app.use("/person",personRoutes);
//we want to authorize menuRoutes too , so we will be using the middleware in this case
app.use("/menu",menuRoutes);

// Set up the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Listening on port ${PORT}`);
});

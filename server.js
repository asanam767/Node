const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { mongodbconnection } = require("./db.js");
const MenuItem = require("./models/MenuItem");
const { userdetails, getdetails } = require("./controllers/user.js");

mongodbconnection("mongodb://127.0.0.1:27017/admin").then(() => {
  console.log("Database Connected");
});

app.use(bodyParser.json());
app.get("/hello", (req, res) => {
  res.send("katta manasa");
});
app.get("/", function (req, res) {
  res.send("Welcome to my hotel... How I can help you?");
});

app.get("/getdetail", getdetails);

//Post route to add a Person
app.post("/persondetail", userdetails);

app.post("/menu", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new MenuItem(data);
    const response = await newMenu.save();
    console.log("Data saved:"); // Debug: Log fetched data
    res.status(200).json(response); // Respond with JSON data
  } catch (err) {
    console.error(err); // Log the error to the console
    res.status(500).json({ error: "Internal Server Error" }); // Send detailed error message
  }
});

app.get("/menu", async (req, res) => {
  try {
    const data = await MenuItem.find(); // Fetch all Person documents
    console.log("Data fetched:", data); // Debug: Log fetched data
    res.status(200).json(data); // Respond with JSON data
  } catch (err) {
    console.error(err); // Debug: Log error
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//import the router files
const personRoutes=require('./routes/personRoutes');

//use the routers
app.use('/person',personRoutes);

app.listen(3000, () => {
  console.log("listening on port 3000");
});

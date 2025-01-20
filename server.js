const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { mongodbconnection } = require("./db.js");
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

//import the router files

//importing the personRoutes
const personRoutes=require('./routes/personRoutes');

//importing the menuRoutes
const menuRoutes=require('./routes/menuRoutes');

//use the routers
app.use('/person',personRoutes);
app.use('/menu',menuRoutes);
 // Create and save data (assuming you've defined a model)
  
app.listen(4000, () => {
  console.log("listening on port 4000");
});

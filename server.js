const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { mongodbconnection } = require("./db.js");
const { userdetails, getdetails } = require("./controllers/user.js");

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

app.get("/", function (req, res) {
  res.send("Welcome to my hotel... How I can help you?");
});

app.get("/getdetail", getdetails);
app.post("/persondetail", userdetails);

// Import and use routers
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");

app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

// Set up the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Listening on port ${PORT}`);
});

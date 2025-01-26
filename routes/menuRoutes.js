const express = require("express");
const router = express.Router();
const MenuItem = require("./../models/MenuItem");
const mongoose = require('mongoose');
router.post("/", async (req, res) => {
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

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find(); // Fetch all Person documents
    console.log("Data fetched:", data); // Debug: Log fetched data
    res.status(200).json(data); // Respond with JSON data
  } catch (err) {
    console.error(err); // Debug: Log error
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:taste", async (req, res) => {
    try {
      const tasteType = req.params.taste; // Extract the work type from the URL parameter
  
      // Assuming you already have a menuItem model and MongoDB connection set up
      const menuItems = await MenuItem.find({ taste: tasteType });
  
      // Send the list of persons with the specified work type as a JSON response
      res.json(menuItems);
    } catch (error) {
      console.error("Error fetching menuItems:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

module.exports = router;

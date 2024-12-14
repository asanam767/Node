const express = require("express");
const router = express.Router();
const Person = require("./../models/Person");
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("Data saved:"); // Debug: Log fetched data
    res.status(200).json(response); // Respond with JSON data
  } catch (err) {
    console.error(err); // Log the error to the console
    res.status(500).json({ error: "Internal Server Error" }); // Send detailed error message
  }
});

// GET method to get the person details
router.get("/", async (req, res) => {
  try {
    const data = await Person.find(); // Fetch all Person documents
    console.log("Data fetched:", data); // Debug: Log fetched data
    res.status(200).json(data); // Respond with JSON data
  } catch (err) {
    console.error(err); // Debug: Log error
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:work", async (req, res) => {
  try {
    const workType = req.params.work; // Extract the work type from the URL parameter

    // Assuming you already have a Person model and MongoDB connection set up
    const persons = await Person.find({ work: workType });

    // Send the list of persons with the specified work type as a JSON response
    res.json(persons);
  } catch (error) {
    console.error("Error fetching persons:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

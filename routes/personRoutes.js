const express = require("express");
const router = express.Router();
const Person = require("./../models/Person");
const mongoose = require("mongoose");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("Data saved:", response);

    const payload = {
      id: response.id,
      username: response.username,
    };

    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("Token generated:", token);
    res.status(200).json({ response, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Person.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = generateToken(payload);
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Profile Route
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    console.log("User data:", userData);
    const user = await Person.findById(userData.id);
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get All Persons
router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const response = await Person.find();
    console.log("Data fetched:", response);
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get Persons by Work Type
router.get("/:work", async (req, res) => {
  try {
    const workType = req.params.work;
    const persons = await Person.find({ work: workType });
    res.json(persons);
  } catch (error) {
    console.error("Error fetching persons:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update Person
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;

    const updatedPerson = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true,
      runValidators: true,
    });

    if (!updatedPerson) {
      return res.status(404).json({ error: "Person not found" });
    }

    res.json(updatedPerson);
  } catch (error) {
    console.error("Error updating person:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete Person
router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(personId)) {
      return res.status(400).json({ error: "Invalid Person ID" });
    }

    const deletedPerson = await Person.findByIdAndRemove(personId);

    if (!deletedPerson) {
      return res.status(404).json({ error: "Person not found" });
    }

    res.json({ message: "Person deleted successfully" });
  } catch (error) {
    console.error("Error deleting person:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

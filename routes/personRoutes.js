const express = require("express");
const router = express.Router();
const Person = require("./../models/Person");
const mongoose = require('mongoose');
const {jwtAuthMiddleware,generateToken}=require('./../jwt');

//post route to add a person
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("Data saved:"); // Debug: Log fetched data


    //this is the payload we will  be sending in the token
    const payload={
      id:response.id,
      username:response.username
    };

    const token=generateToken(payload);
    //print payload
    console.log(JSON.stringify(payload));

    console.log("Token generated:",token);
    res.status(200).json({response:response,token:token}); // Respond with JSON data
  } catch (err) {
    console.error(err); // Log the error to the console
    res.status(500).json({ error: "Internal Server Error" }); // Send detailed error message
  }
});

//Login Route
router.post('/login',async (req,res)=>{
try{
  //Extract the username and password from the request body
  const {username,password}=req.body;

  //Find the user by username
  const user=await Person.findOne({username:username});
  //if user does not exist or password does not match,return error
  if( !user || !(await user.comparePassword(password))){
    return res.status(401).json({error: 'Invalid username or password'});
}

  //if user exists and password matches,generate a JWT token
  const payload={
    id:user.id,
    username:user.username
  }

  const token=generateToken(payload);
  //return the token as a response
  res.json({token:token});


}
catch(err){
  console.error(err);
  res.status(500).json({error:"Internal server error"});
}
})














// GET method to get the person details
router.get("/",jwtAuthMiddleware, async (req, res) => {
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

router.put('/person/:id', async (req, res) => {
    try {
      const personId = req.params.id; // Extract the person's ID from the URL parameter
      const updatedPersonData = req.body; // Updated data for the person
  
      // Assuming you have a Person model
      const updatedPerson = await Person.findByIdAndUpdate(personId, updatedPersonData, {
        new: true, // Return the updated document
        runValidators: true, // Run Mongoose validation
      });
  
      if (!updatedPerson) {
        return res.status(404).json({ error: 'Person not found' });
      }
  
      // Send the updated person data as a JSON response
      res.json(updatedPerson);
    } catch (error) {
      console.error('Error updating person:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // DELETE route to remove a person by ID
router.delete("/person/:id", async (req, res) => {
    try {
      const personId = req.params.id; // Extract the person's ID from the URL parameter
  
      // Validate ObjectId
      if (!mongoose.Types.ObjectId.isValid(personId)) {
        return res.status(400).json({ error: "Invalid Person ID" });
      }
  
      // Find and remove the person
      const deletedPerson = await Person.findByIdAndRemove(personId);
  
      if (!deletedPerson) {
        return res.status(404).json({ error: "Person not found" });
      }
  
      // Send a success message as a JSON response
      res.json({ message: "Person deleted successfully" });
    } catch (error) {
      console.error("Error deleting person:", error.message || error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  module.exports = router;

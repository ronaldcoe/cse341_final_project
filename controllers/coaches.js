// Import the Mongoose Library
const mongoose = require("mongoose");
// Import the Coaches model (create a models/coaches.js file)
const Coaches = require("../models/coaches");

const getAllCoaches = async (req, res) => {
  // #swagger.tags=["coaches"]
  try {
    const allCoaches = await Coaches.find();
    res.status(200).json(allCoaches);
  } catch (error) {
    console.error("Error fetching coaches", error);

    // Check if the error is a Mongoose validation error
    if (error.name === "ValidationError") {
      // Extract validation error messages and respond with a 400 status
      const validationErrors = Object.values(error.errors).map(
        (error) => error.message
      );

      return res.status(400).json({ errors: validationErrors });
    }
    res.status(500).send("Error fetching coaches");
  }
};

const getCoachById = async (req, res) => {
  //#swagger.tags=["coaches"]
  try {
    const coachId = req.params.Coach_ID;
    const oneCoach = await Coaches.findOne({ Coach_ID: coachId });
    if (!oneCoach) {
      return res.status(404).json({ error: "Coach not found" });
    }
    res.status(200).json(oneCoach);
  } catch (error) {
    console.error("Error fetching coach, make sure you typed a correct ID");

    // Check if the error is a Mongoose validation error
    if (error.name === "ValidationError") {
      // Extract validation error messages and respond with a 400 status
      const validationErrors = Object.values(error.errors).map(
        (error) => error.message
      );

      return res.status(400).json({ errors: validationErrors });
    }
    res.status(500).json({
      error: "Error fetching coach, make sure you typed a correct ID",
    });
  }
};

const createCoach = async (req, res) => {
  //#swagger.tags=["coaches"]
  try {
    // Extract coach details from the request body
    const coach = {
      Name: req.body.Name,
      Coach_ID: req.body.Coach_ID,
      Age: req.body.Age,
      Nationality: req.body.Nationality,
      Team_ID: req.body.Team_ID,
    };
    const newCoach = await Coaches.create(coach);
    res.status(204).json(newCoach);
  } catch (error) {
    // Log the detailed error information
    console.error("Error creating coach:", error);

    // Check if the error is a Mongoose validation error
    if (error.name === "ValidationError") {
      // Extract validation error messages and respond with a 400 status
      const validationErrors = Object.values(error.errors).map(
        (error) => error.message
      );

      return res.status(400).json({ errors: validationErrors });
    }
    // Respond with a 500 Internal Server Error status and a more specific error message
    res.status(500).json({
      error: "Error creating coach. Check the server logs for more details.",
    });
  }
};

const updateCoach = async (req, res) => {
  //#swagger.tags=["coaches"]
  try {
    const coachId = req.params.Coach_ID;
    // Extract coach details from the request body
    const coach = {
      Coach_ID: coachId,
      Name: req.body.Name,
      Age: req.body.Age,
      Nationality: req.body.Nationality,
      Team_ID: req.body.Team_ID,
      
    };
    await Coaches.validate(coach);
    const updatedCoach = await Coaches.replaceOne({ Coach_ID: coachId }, coach);


    console.log("Updated Coach:", updatedCoach); // Log the updated coach

    res.status(204).json(updatedCoach);
  } catch (error) {
  
    // Log the detailed error information
    console.error("Error updating coach:", error);
     // Check if the error is a Mongoose validation error
     if (error.name === "ValidationError") {
      // Extract validation error messages and respond with a 400 status
      const validationErrors = Object.values(error.errors).map(
        (error) => error.message
      );

      return res.status(400).json({ errors: validationErrors });
    }

    // Respond with a 500 Internal Server Error status and a more specific error message
    res.status(500).json({
      error: "Error updating coach. Check the server logs for more details.",
    });
  }
};


const deleteCoach = async (req, res) => {
  //#swagger.tags=["coaches"]
  try {
    const coachId = req.params.Coach_ID;
    const deletedCoach = await Coaches.deleteOne({ Coach_ID: coachId });
    res.status(204).json(deletedCoach);
  } catch (error) {
    // Log the detailed error information
    console.error("Error deleting coach:", error);

    // Check if the error is a Mongoose validation error
    if (error.name === "ValidationError") {
      // Extract validation error messages and respond with a 400 status
      const validationErrors = Object.values(error.errors).map(
        (error) => error.message
      );

      return res.status(400).json({ errors: validationErrors });
    }
    // Respond with a 500 Internal Server Error status and a more specific error message
    res.status(500).json({
      error: "Error deleting coach. Check the server logs for more details.",
    });
  }
};

module.exports = {
  getAllCoaches,
  getCoachById,
  createCoach,
  updateCoach,
  deleteCoach,
};

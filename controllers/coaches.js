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
    res.status(500).send("Error fetching coaches");
  }
};

const getCoachById = async (req, res) => {
  //#swagger.tags=["coaches"]
  try {
    const coachId = req.params["Coach_ID"];
    const oneCoach = await Coaches.findById(coachId);
    if (!oneCoach) {
      return res.status(404).json({ error: "Coach not found" });
    }
    res.status(200).json(oneCoach);
  } catch (error) {
    console.error("Error fetching coach, make sure you typed a correct ID");
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
      name: req.body.Name,
      coachId: req.body["Coach_ID"],
      age: req.body.Age,
      nationality: req.body.Nationality,
      teamId: req.body["Team ID"],
    };
    const newCoach = await Coaches.Create(coach);
    res.status(204).json(newCoach);
  } catch {
    // Log the detailed error information
    console.error("Error creating coach:", error);

    // Respond with a 500 Internal Server Error status and a more specific error message
    res.status(500).json({
      error: "Error creating coach. Check the server logs for more details.",
    });
  }
};

const updateCoach = async (req, res) => {
  //#swagger.tags=["coaches"]
  try {
    const coachId = req.params["Coach_ID"];
    // Extract coach details from the request body
    const coach = {
      name: req.body.Name,
      coachId: coachId,
      age: req.body.Age,
      nationality: req.body.Nationality,
      teamId: req.body["Team ID"],
    };
    const updatedCoach = await Coaches.replaceOne({ coachId: coachId }, coach);
    res.status(204).json(updatedCoach);
  } catch {
    // Log the detailed error information
    console.error("Error updating coach:", error);

    // Respond with a 500 Internal Server Error status and a more specific error message
    res.status(500).json({
      error: "Error updating coach. Check the server logs for more details.",
    });
  }
};

const deleteCoach = async (req, res) => {
  //#swagger.tags=["coaches"]
  try {
    const coachId = req.params["Coach_ID"];
    const deletedCoach = await Coaches.deleteOne({ coachId: coachId });
    res.status(204).json(deletedCoach);
  } catch {
    // Log the detailed error information
    console.error("Error deleting coach:", error);

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
  deleteCoach
};

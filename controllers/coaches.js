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

const getSingleCoach = async (req, res) => {
  //#swagger.tags=["coaches"]
  try {
    const coachId = req.params.id;
    const oneCoach = await Coaches.findById(coachId);
    res.status(200).json(oneCoach);
  } catch (error) {
    console.error("Error fetching coach, make sure you typed a correct ID");
    res
      .status(500)
      .json({
        error: "Error fetching coach, make sure you typed a correct ID",
      });
  }
};

const createCoach = async (req, res) => {
  //#swagger.tags=["coaches"]
  try {
    // Extract coach details from the request body
    const coach = {
    //   name: req.body.name,
    //   position: req.body.position,
    //   currentTeam: req.body.currentTeam,
    //   jerseyNumber: req.body.jerseyNumber,
    //   nationality: req.body.nationality,
    //   height: {
    //     feet: req.body.height.feet,
    //     inches: req.body.height.inches,
    //   },
    //   weight: req.body.weight,
    //   birthdate: req.body.birthdate,
    //   email: req.body.email,
    };
    const newCoach = await Coaches.Create(coach);
    res.status(204).json(newCoach);
  } catch {
    // Log the detailed error information
    console.error("Error creating coach:", error);

    // Respond with a 500 Internal Server Error status and a more specific error message
    res
      .status(500)
      .json({
        error: "Error creating coach. Check the server logs for more details.",
      });
  }
};
module.exports = {
  getAllCoaches,
  getSingleCoach,
  createCoach,
};

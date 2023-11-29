// Import the Mongoose Library
const mongoose = require("mongoose");
// Import the teams model (create a models/teams.js file)
const Teams = require("../models/teams");

const getAllTeams = async (req, res) => {
  // #swagger.tags=["teams"]
  try {
    const allTeams = await Teams.find();
    res.status(200).json(allTeams);
  } catch (error) {
    console.error("Error fetching teames", error);
    res.status(500).send("Error fetching teames");
  }
};

const getSingleTeam = async (req, res) => {
  //#swagger.tags=["teams"]
  try {
    const teamId = req.params["Team ID"];
    const oneTeam = await Teams.findById(teamId);
    res.status(200).json(oneTeam);
  } catch (error) {
    console.error("Error fetching team, make sure you typed a correct ID");
    res.status(500).json({
      error: "Error fetching team, make sure you typed a correct ID",
    });
  }
};

const createTeam = async (req, res) => {
  //#swagger.tags=["teams"]
  try {
    // Extract team details from the request body
    const team = {
      teamName: req.body["Team Name"],
      coachId: req.body["Coach ID"],
      location: req.body.Location,
      teamId: req.body["Team ID"],
      foundedYear: req.body["Founded Year"],
    };
    const newTeam = await Teams.Create(team);
    res.status(204).json(newTeam);
  } catch {
    // Log the detailed error information
    console.error("Error creating team:", error);

    // Respond with a 500 Internal Server Error status and a more specific error message
    res
      .status(500)
      .json({
        error: "Error creating team. Check the server logs for more details.",
      });
  }
};

module.exports = {
  getAllTeams,
  getSingleTeam,
  createTeam,
};

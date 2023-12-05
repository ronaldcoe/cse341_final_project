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
    console.error("Error fetching teams", error);

    // Check if the error is a Mongoose validation error
    if (error.name === "ValidationError") {
      // Extract validation error messages and respond with a 400 status
      const validationErrors = Object.values(error.errors).map(
        (error) => error.message
      );

      return res.status(400).json({ errors: validationErrors });
    }
    res.status(500).send("Error fetching teames");
  }
};

const getTeamById = async (req, res) => {
  //#swagger.tags=["teams"]
  try {
    const teamId = req.params["Team ID"];
    const oneTeam = await Teams.findById(teamId);
    res.status(200).json(oneTeam);
  } catch (error) {
    console.error("Error fetching team, make sure you typed a correct ID");

    // Check if the error is a Mongoose validation error
    if (error.name === "ValidationError") {
      // Extract validation error messages and respond with a 400 status
      const validationErrors = Object.values(error.errors).map(
        (error) => error.message
      );

      return res.status(400).json({ errors: validationErrors });
    }
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
    const newTeam = await Teams.create(team);
    res.status(204).json(newTeam);
  } catch (error) {
    // Log the detailed error information
    console.error("Error creating team:", error);

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
      error: "Error creating team. Check the server logs for more details.",
    });
  }
};

const updateTeam = async (req, res) => {
  //#swagger.tags=["teams"]
  try {
    const teamId = req.params["Team ID"];
    // Extract team details from the request body
    const team = {
      teamName: req.body["Team Name"],
      coachId: req.body["Coach ID"],
      location: req.body.Location,
      teamId: teamId,
      foundedYear: req.body["Founded Year"],
    };
    const updatedTeam = await Teams.Update(team);
    res.status(204).json(updatedTeam);
  } catch (error) {
    // Log the detailed error information
    console.error("Error updating team:", error);

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
      error: "Error updating team. Check the server logs for more details.",
    });
  }
};

const deleteTeam = async (req, res) => {
  //#swagger.tags=["teams"]
  try {
    const teamId = req.params["Team ID"];
    const deletedTeam = await Teams.Delete(teamId);
    res.status(204).json(deletedTeam);
  } catch (error) {
    // Log the detailed error information
    console.error("Error deleting team:", error);

    // Respond with a 500 Internal Server Error status and a more specific error message
    res.status(500).json({
      error: "Error deleting team. Check the server logs for more details.",
    });
  }
};

module.exports = {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
};

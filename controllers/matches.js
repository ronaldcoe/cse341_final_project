// Import the Mongoose Library
const mongoose = require("mongoose");
// Import the matches model (create a models/matches.js file)
const Matches = require("../models/matches");

const getAllMatches = async (req, res) => {
  //#swagger.tags=["matches"]
  try {
    const matches = await Matches.find();
    res.status(200).json(matches);
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({ error: "Error fetching matches" });
  }
};

const getSingleMatch = async (req, res) => {
  //#swagger.tags=["matches"]
  try {
    const matchId = req.params["Match ID"];
    const match = await Matches.findById(matchId);
    res.status(200).json(match);
  } catch (error) {
    console.error("Error fetching match:", error);
    res.status(500).json({ error: "Error fetching match" });
  }
};

const getMatchesByTeamId = async (req, res) => {
  //#swagger.tags=["matches"]
  try {
    const teamId = req.params["Team ID"];
    const match = await Matches.findById(teamId);
    res.status(200).json(match);
  } catch (error) {
    console.error("Error fetching match:", error);
    res.status(500).json({ error: "Error fetching match" });
  }
};
const createMatch = async (req, res) => {
  //#swagger.tags=["matches"]
  try {
    const match = {
      matchId: req.body["Match ID"],
      date: req.body.Date,
      teamsInvolved: req.body["Teams Involved"],
      score: req.body.Score,
      stadium: req.body.Stadium,
      goals: req.body.Goals,
    };
    const newMatch = await Matches.create(match);
    res.status(204).json(newMatch);
  } catch (error) {
    console.error("Error creating match:", error);

    // Respond with a 500 Internal Server Error status and a more specific error message
    res.status(500).json({
      error: "Error creating match. Check the server logs for more details.",
    });
  }
};

const updateMatch = async (req, res) => {
  //#swagger.tags=["matches"]
  try {
    const matchId = req.params["Match ID"];
    const match = {
      matchId: matchId,
      date: req.body.Date,
      teamsInvolved: req.body["Teams Involved"],
      score: req.body.Score,
      stadium: req.body.Stadium,
      goals: req.body.Goals,
    };
    const updatedMatch = await Matches.Update(match);
    res.status(204).json(updatedMatch);
  } catch (error) {
    console.error("Error updating match:", error);

    // Respond with a 500 Internal Server Error status and a more specific error message
    res.status(500).json({
      error: "Error updating match. Check the server logs for more details.",
    });
  }
};

const deleteMatch = async (req, res) => {
  //#swagger.tags=["matches"]
  try {
    const matchId = req.params["Match ID"];
    const deletedMatch = await Matches.Delete(matchId);
    res.status(204).json(deletedMatch);
  } catch (error) {
    console.error("Error deleting match:", error);

    // Respond with a 500 Internal Server Error status and a more specific error message
    res.status(500).json({
      error: "Error deleting match. Check the server logs for more details.",
    });
  }
};

module.exports = {
  getAllMatches,
  getSingleMatch,
  getMatchesByTeamId,
  createMatch,
  updateMatch,
  deleteMatch
};

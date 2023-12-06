// Import the Mongoose Library
const express = require('express');

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

const getMatchById = async (req, res) => {
  //#swagger.tags=["matches"]
  try {
    const matchId = req.params["Match_ID"];
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
    const teamId = req.params["Team_ID"];
    const match = await Matches.findById({"Team_ID": teamId});
    res.status(200).json(match);
  } catch (error) {
    console.error("Error fetching match:", error);
    res.status(500).json({ error: "Error fetching match" });
  }
};

const createMatch = async (req, res) => {
  //#swagger.tags=["matches"]
  try {
    const matchData = {
      matchId: req.body["Match_ID"],
      date: new Date(req.body.Date), // Converting to Date object
      teamsInvolved: req.body["Teams Involved"],
      score: req.body.Score,
      stadium: req.body.Stadium,
      goals: req.body.Goals.map(goal => ({
        playerId: goal["Player_ID"],
        time: parseInt(goal.Time) // Ensure time is a number
      })),
    };
    const newMatch = await Matches.create(matchData);
    res.status(201).json(newMatch); // 201 for successful creation
  } catch (error) {
    console.error("Error creating match:", error);
    res.status(500).json({
      error: "Error creating match. Check the server logs for more details.",
    });
  }
};

const updateMatch = async (req, res) => {
  //#swagger.tags=["matches"]
  try {
    const matchId = req.params["Match_ID"]; // Assuming the param is named 'matchId'
    const matchData = {
      date: new Date(req.body.Date),
      teamsInvolved: req.body["Teams Involved"],
      score: req.body.Score,
      stadium: req.body.Stadium,
      goals: req.body.Goals.map(goal => ({
        playerId: goal["Player_ID"],
        time: parseInt(goal.Time)
      })),
    };
    const updatedMatch = await Matches.findOneAndUpdate({ matchId }, matchData, { new: true });
    res.status(200).json(updatedMatch); // 200 for successful update
  } catch (error) {
    console.error("Error updating match:", error);
    res.status(500).json({
      error: "Error updating match. Check the server logs for more details.",
    });
  }
};

const deleteMatch = async (req, res) => {
  //#swagger.tags=["matches"]
  try {
    const matchId = req.params["Match_ID"];
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
  getMatchById,
  getMatchesByTeamId,
  createMatch,
  updateMatch,
  deleteMatch
};




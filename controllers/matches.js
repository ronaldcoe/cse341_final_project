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
    const matchId = req.params.Match_ID;
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

    const teamId = req.params.Team_ID;
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

    const matchData = {
      matchId: req.body.Match_ID,
      date: new Date(req.body.Date), // Converting to Date object
      teamsInvolved: req.body.Teams_Involved,

      score: req.body.Score,
      stadium: req.body.Stadium,
      goals: req.body.Goals.map(goal => ({
        playerId: goal.Player_ID,
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

    const matchId = req.params.Match_ID; // Assuming the param is named 'matchId'
    const matchData = {
      Match_ID: matchId,
      Date: new Date(req.body.Date),
      Teams_Involved: req.body.Teams_Involved,

      Score: req.body.Score,
      Stadium: req.body.Stadium,
      Goals: req.body.Goals.map(goal => ({
        Player_ID: goal.Player_ID,
        Time: parseInt(goal.Time)
      })),
    };
    await Matches.validate(matchData);
    const updatedMatch = await Matches.replaceOne({ Match_ID: matchId }, matchData);
    res.status(204).json(updatedMatch);
  } catch (error) {
    console.error("Error updating match:", error);

    if (error.name === "ValidationError") {
      // Extract validation error messages and respond with a 400 status
      const validationErrors = Object.values(error.errors).map(
        (error) => error.message
      );

      return res.status(400).json({ errors: validationErrors });
    }

    res.status(500).json({
      error: "Error updating match. Check the server logs for more details.",
    });
  }
};

const deleteMatch = async (req, res) => {
  //#swagger.tags=["matches"]
  try {
    const matchId = req.params.Match_ID;
    const deletedMatch = await Matches.deleteOne({ Match_ID: matchId });
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
  deleteMatch,
};




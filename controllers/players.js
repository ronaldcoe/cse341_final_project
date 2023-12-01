// Import the Mongoose Library
const mongoose = require("mongoose");
// Import the players model (create a models/players.js file)
const Players = require("../models/players");

const getAllPlayers = async (req, res) => {
  // #swagger.tags=["players"]
  try {
    const allPlayers = await Players.find();
    res.status(200).json(allPlayers);
  } catch (error) {
    console.error("Error fetching playeres", error);
    res.status(500).send("Error fetching playeres");
  }
};

const getSinglePlayer = async (req, res) => {
  //#swagger.tags=["players"]
  try {
    const playerId = req.params.id;
    const onePlayer = await Players.findById(playerId);
    res.status(200).json(onePlayer);
  } catch (error) {
    console.error("Error fetching player, make sure you typed a correct ID");
    res.status(500).json({
      error: "Error fetching player, make sure you typed a correct ID",
    });
  }
};
const getPlayersByPosition = async (req, res) => {
  //#swagger.tags=["players"]
  try {
    const position = req.params.Position;
    const playersByPosition = await Players.find({ Position: position });
    res.status(200).json(playersByPosition);
  } catch (error) {
    console.error("Error fetching players by position", error);
    res.status(500).json({
      error: "Error fetching players by position",
    });
  }
};

const createPlayer = async (req, res) => {
  //#swagger.tags=["players"]
  try {
    // Extract player details from the request body
    const player = {
      playerId: req.body["Player ID"],
      name: req.body.Name,
      age: req.body.Age,
      height: req.body.Height,
      nationality: req.body.Nationality,
      position: req.body.Position,
      teamId: req.body["Team ID"],
      
    };
    const newPlayer = await Players.Create(player);
    res.status(204).json(newPlayer);
  } catch {
    // Log the detailed error information
    console.error("Error creating player:", error);

    // Respond with a 500 Internal Server Error status and a more specific error message
    res.status(500).json({
      error: "Error creating player. Check the server logs for more details.",
    });
  }
};

const updatePlayer = async (req, res) => {
  //#swagger.tags=["players"]
  try {
    const playerId = req.params["Player ID"];
    // Extract player details from the request body
    const player = {
      name: req.body.Name,
      position: req.body.Position,
      playerId: playerId,
      age: req.body.Age,
      nationality: req.body.Nationality,
      teamId: req.body["Team ID"],
      height: req.body.Height,
    };
    const updatePlayer = await Players.Update(player);
    res.status(204).json(updatePlayer);
  } catch {
    // Log the detailed error information
    console.error("Error updating player:", error);

    // Respond with a 500 Internal Server Error status and a more specific error message
    res.status(500).json({
      error: "Error updating player. Check the server logs for more details.",
    });
  }
};

const deletePlayer = async (req, res) => {
  //#swagger.tags=["players"]
  try {
    const playerId = req.params["Player ID"];
    const deletePlayer = await Players.Delete(playerId);
    res.status(204).json(deletePlayer);
  } catch {
    // Log the detailed error information
    console.error("Error deleting player:", error);

    // Respond with a 500 Internal Server Error status and a more specific error message
    res.status(500).json({
      error: "Error deleting player. Check the server logs for more details.",
    });
  }
};

module.exports = {
  getPlayersByPosition,
  getAllPlayers,
  getSinglePlayer,
  createPlayer,
  updatePlayer,
  deletePlayer
};


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
    // Check if the error is a Mongoose validation error
    if (error.name === "ValidationError") {
      // Extract validation error messages and respond with a 400 status
      const validationErrors = Object.values(error.errors).map(
        (error) => error.message
      );

      return res.status(400).json({ errors: validationErrors });
    }
    res.status(500).send("Error fetching playeres");
  }
};

const getPlayerById = async (req, res) => {
  //#swagger.tags=["players"]
  try {
    const playerId = req.params.Player_ID;

    const onePlayer = await Players.findOne({ Player_ID: playerId });

    if (!onePlayer) {
      // If no player is found, respond with a 404 Not Found status
      return res.status(404).json({ error: "Player not found" });
    }
    // Respond with a 200 status and the player in the response body
    res.status(200).json(onePlayer);
  } catch (error) {
    console.error("Error fetching player by ID:", error);

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
      error:
        "Error fetching player by ID. Check the server logs for more details.",
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

    // Check if the error is a Mongoose validation error
    if (error.name === "ValidationError") {
      // Extract validation error messages and respond with a 400 status
      const validationErrors = Object.values(error.errors).map(
        (error) => error.message
      );

      return res.status(400).json({ errors: validationErrors });
    }

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
      Player_ID: req.body.Player_ID,
      Name: req.body.Name,
      Age: req.body.Age,
      Height: req.body.Height,
      Nationality: req.body.Nationality,
      Position: req.body.Position,
      Team_ID: req.body.Team_ID,
    };
    const newPlayer = await Players.create(player);
    res.status(204).json(newPlayer);
  } catch (error) {
    // Check if the error is a Mongoose validation error
    if (error.name === "ValidationError") {
      // Extract validation error messages and respond with a 400 status
      const validationErrors = Object.values(error.errors).map(
        (error) => error.message
      );

      return res.status(400).json({ errors: validationErrors });
    }

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
    const playerId = req.params.Player_ID;
    // Extract player details from the request body
    const player = {
      Name: req.body.Name,
      Position: req.body.Position,
      Player_ID: playerId,
      Age: req.body.Age,
      Nationality: req.body.Nationality,
      Team_ID: req.body.Team_ID,
      Height: req.body.Height,
    };
    await Players.validate(player);
    const updatePlayer = await Players.replaceOne({ Player_ID: playerId }, player);
    if(updatePlayer.modifiedCount === 0) {
      return res.status(404).json({ error: "Player not found" });
    }
    res.status(204).json(updatePlayer);
  } catch (error) {
    // Log the detailed error information
    console.error("Error updating player:", error);

    if (error.name === "ValidationError") {
      // Extract validation error messages and respond with a 400 status
      const validationErrors = Object.values(error.errors).map(
        (error) => error.message
      );

      return res.status(400).json({ errors: validationErrors });
    }

    // Respond with a 500 Internal Server Error status and a more specific error message
    res.status(500).json({
      error: "Error updating player. Check the server logs for more details.",
    });
  }
};

const deletePlayer = async (req, res) => {
  //#swagger.tags=["players"]
  try {
    const playerId = req.params.Player_ID;
    const deletePlayer = await Players.deleteOne({ Player_ID: playerId });
    if (deletePlayer.deletedCount === 0) {
      // If no player is found, respond with a 404 Not Found status
      return res.status(404).json({ error: "Player not found" });
    }
    res.status(204).json(deletePlayer);
  } catch (error) {
    // Log the detailed error information
    console.error("Error deleting player:", error);

    if (error.name === "ValidationError") {
      // Extract validation error messages and respond with a 400 status
      const validationErrors = Object.values(error.errors).map(
        (error) => error.message
      );

      return res.status(400).json({ errors: validationErrors });
    }

    // Respond with a 500 Internal Server Error status and a more specific error message
    res.status(500).json({
      error: "Error deleting player. Check the server logs for more details.",
    });
  }
};

module.exports = {
  getPlayersByPosition,
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
};

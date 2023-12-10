const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
 
  Player_ID: { type: String, required: true, maxLength: 5 },
  Name: {
    type: String,
    required: true,
    maxLength: 25, // Adjusted maximum length to 25 characters
    validate: {
      validator: function (value) {
        return value.trim().length > 0; // Ensures Name is not a empty string after trimming whitespace
      },
      message:
        "Name must be a non-empty string with a maximum length of 25 characters.", // Updated error message
    },
  },
  Age: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Ensure that the age is a non-empty string and represents a value greater than 14
        const parsedAge = parseInt(value, 10);
        return (
          typeof value === "string" &&
          value.trim().length > 0 &&
          !isNaN(parsedAge) &&
          parsedAge > 14
        );
      },
      message:
        "Age must be a non-empty string representing a value greater than 14.",
    },
  },

  Height: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Custom validation logic for the height field in centimeters with exactly three digits
        return /^\d{3}cm$/.test(value);
      },
      message:
        "Height must be a string in the format of exactly three-digit numbers followed by 'cm'. Example: '123cm'.",
    },
  },

  Nationality: {
    type: String,
    required: true,
    maxLength: 25,
    validate: {
      validator: function (value) {
        // Ensure that the value is a string and has no more than 25 characters
        return typeof value === "string" && value.length <= 25;
      },
      message: "Nationality must be a string with no more than 25 characters.",
    },
  },
  Position: {
    type: String,
    required: true,
    maxLength: 15,
    validate: {
      validator: function (value) {
        // Ensure that the value is a string with no numbers
        return /^[^\d]+$/.test(value);
      },
      message:
        "Position must be a string with no numbers and a maximum length of 15 characters.",
    },
  },
  Team_ID: {
    type: String,
    validate: {
      validator: function (value) {
        // Ensure that the value is a string starting with 'T' followed by exactly 3 digits
        return /^T\d{3}$/.test(value);
      },
      message:
        'TeamId must be a string starting with "T" followed by exactly 3 digits, like "T012".',
    },
  },
});

const Players = mongoose.model("players", playerSchema);

module.exports = Players;

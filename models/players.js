const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  //   name: { type: String, required: true, maxLength: 30 },
  //   position: { type: String, required: true, maxLength: 25 },
  //   nationality: { type: String, required: true, maxLength: 25 },
  //   playerId: { type: String, required: true, maxLength: 4 },
  //   age: { type: Number, required: true, maxLength: 2 },
  //   teamId: { type: String, required: true, maxLength: 4 },
  //   height: { type: String, required: true, maxLength: 9 },
  // });

  playerId: { type: String, required: true, maxLength: 5 },
  name: {
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
  // age: {
  //   type: Number,
  //   required: true,
  //   validate: {
  //     validator: function (value) {
  //       // Ensure that the age is a number and is greater than or equal to 14
  //       return Number.isInteger(value) && value >= 14;
  //     },
  //     message: "Age must be a number greater than or equal to 14.",
  //   },
  // },

  age: {
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

  height: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Custom validation logic for the height field
        return /^\d{1,2}ft \d{1,2}in$/.test(value);
      },
      message:
        "Height must be a string in the format '#(#)ft #(#)in', where #(#) are one or two-digit numbers.",
    },
  },
  nationality: {
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
  position: {
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
  teamId: {
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

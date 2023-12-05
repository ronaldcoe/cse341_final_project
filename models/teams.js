const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
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
  teamName: {
    type: String,
    required: true,
    maxLength: 25, // Adjusted maximum length to 25 characters
    validate: {
      validator: function (value) {
        return value.trim().length > 0; // Ensures Team Name is not a empty string after trimming whitespace
      },
      message:
        "Team Name must be a non-empty string with a maximum length of 25 characters.", // Updated error message
    },
  },
  location: {
    type: String,
    required: true,
    maxLength: 20, // Adjusted maximum length to 20 characters
    validate: {
      validator: function (value) {
        return value.trim().length > 0; // Ensures Location is not a empty string after trimming whitespace
      },
      message:
        "Location must be a non-empty string with a maximum length of 20 characters.", // Updated error message
    },
  },

  foundedYear: {
    type: String,
    validate: {
      validator: function (value) {
        // Check if the value is a string of exactly four digits
        if (!/^\d{4}$/.test(value)) {
          return false;
        }

        // Convert the string to an integer and check if it's a valid integer
        const intValue = parseInt(value, 10);
        return Number.isInteger(intValue);
      },
      message:
        "Founded Year must be a string of exactly 4 integer digits, like '2022'.",
    },
  },
  coachId: {
    type: String,
    validate: {
      validator: function (value) {
        // Check if the value is a string starting with 'C' followed by exactly 3 digits
        const match = /^C(\d{3})$/.exec(value);

        if (!match) {
          return false;
        }

        // Extract the digits part and check if it's a valid integer
        const digits = match[1];
        const intValue = parseInt(digits, 10);
        return Number.isInteger(intValue);
      },
      message:
        "CoachId must be a string starting with 'C' followed by exactly 3 integer digits, like 'C123'.",
    },
  },
});

const Teams = mongoose.model("teams", teamSchema);

module.exports = Teams;

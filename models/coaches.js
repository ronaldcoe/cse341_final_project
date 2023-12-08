const mongoose = require("mongoose");

const coachSchema = new mongoose.Schema({
  Coach_ID: {
    type: String,
    validate: {
      validator: function (value) {
        // Ensure that the value is a string starting with 'C' followed by exactly 3 digits
        return /^C\d{3}$/.test(value);
      },
      message:
        'Coach_ID must be a string starting with "C" followed by exactly 3 digits, like "C012".',
    },
  },
  Name: {
    type: String,
    maxLength: 25,
    required: true,
    message: "Name must be a string with no more than 25 characters.",
  },
  Age: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: "Age must be an integer.",
    },
    min: 18,
    max: 99,
    required: true,
    message: "Age must be a number between 18 and 99.",
  },
  Nationality: {
    type: String,
    maxLength: 25,
    required: true,
    message: "Nationality must be a string with no more than 25 characters.",
  },
  Team_ID: {
    type: String,
    validate: {
      validator: function (value) {
        // Ensure that the value is a string starting with 'T' followed by exactly 3 digits
        return /^T\d{3}$/.test(value);
      },
      message:
        'Team_ID must be a string starting with "T" followed by exactly 3 digits, like "T012".',
    },
  },
});

const Coaches = mongoose.model("coaches", coachSchema);

module.exports = Coaches;

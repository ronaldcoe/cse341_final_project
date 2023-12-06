const mongoose = require("mongoose");

const coachSchema = new mongoose.Schema({
  coachId: {
    type: String,
    required: true,
    maxLength: 5, //Maximun length of coachId
    validate: {
      validator: function (value) {
        return /^C\d{3}$/.test(value); // Assuming Coach ID starts with 'C' followed by 3 digits
      },
      message: 'Coach ID must be a string starting with "C" followed by 3 digits.',
    },
  },
  name: {
    type: String,
    required: true,
    maxLength: 50, // Maximum length of coach name
  },
  age: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return value > 0 && value < 100; // Assuming age range between 1 to 99
      },
      message: 'Age must be a valid number between 1 and 99.',
    },
  },
  nationality: {
    type: String,
    required: true,
    maxLength: 30, ///Length of the coach nationality
  },
  teamId: {
    type: String,
    required: true,
    maxLength: 4,
    validate: {
      validator: function (value) {
        return /^T\d{3}$/.test(value); // Ensuring the Team ID starts with 'T' followed by exactly 3 digits
      },
      message: 'Team ID must be a string starting with "T" followed by exactly 3 digits.',
    },
  },
});

const Coaches = mongoose.model("coaches", coachSchema);

module.exports = Coaches;

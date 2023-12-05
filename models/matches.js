const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  playerId: {
    type: String,
    required: true,
    maxLength: 5, // Adjust based on the format of your Player IDs
  },
  time: {
    type: Number,
    required: true,
    min: 1, // Assuming minimum time is 1 minute
    max: 120, // Assuming maximum time is 120 minutes (including extra time)
  }
});

const matchSchema = new mongoose.Schema({
  matchId: {
    type: String,
    required: true,
    maxLength: 4, // Adjust as needed based on the Match ID format
  },
  date: {
    type: Date,
    required: true,
  },
  teamsInvolved: {
    type: [String], // Array of strings to store Team IDs
    required: true,
    validate: [arrayLimit, '{PATH} must have exactly 2 teams involved']
  },
  score: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^\d+-\d+$/.test(value); // Validates score format like "5-0"
      },
      message: 'Score must be in the format "X-Y" where X and Y are numbers.'
    },
  },
  stadium: {
    type: String,
    required: true,
    maxLength: 50, // Adjust based on the expected stadium name length
  },
  //goals: [goalSchema] // Embedded sub-document for goals
});

function arrayLimit(val) {
  return val.length === 2;
}

const Matches = mongoose.model("matches", matchSchema);

module.exports = Matches;

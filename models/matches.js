const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
    Match_ID: { type: String, required: true, maxLength: 5 },
    Date: { type: String, required: true, maxLength: 10 },
    Score: { type: String, required: true, 
        validate: {
            validator: function (value) {
                return /\d{1,2}-\d{1,2}/.test(value);
            },
            message: "Score must be a non-empty string. Example: 1-0",
        },
    },
    Stadium: { type: String, required: true, maxLength: 25 },
    Goals: { type: Array, required: true},
    Teams: { type: Array, required: true}
})

const Matches = mongoose.model("Matches", matchSchema);
module.exports = Matches;
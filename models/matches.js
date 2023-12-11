const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    Match_ID: {
        type: String,
        validate: {
            validator: function (value) {
                // Ensure that the value is a string starting with 'M' followed by exactly 3 digits
                return /^M\d{3}$/.test(value);
            },
            message:
                'Match_ID must be a string starting with "M" followed by exactly 3 digits, like "M012".',
        },
    },
    Date: {
        type: Date,
        required: true,
        message: "Date must be a date.",
    },
    Teams_Involved: {
        type: Array,
        required: true,
        validate: {
            //check if the array contains valid team ids
            validator: function (value) {
                // Checks that the array contains 2 elements
                if (value.length !== 2) {
                    return false;
                }
                // Ensure that the value is an array of strings starting with 'T' followed by exactly 3 digits
                for (let i = 0; i < value.length; i++) {
                    if (!/^T\d{3}$/.test(value[i])) {
                        return false;
                    }
                }
            },
            message:
                'Teams_Involved must be an array of two strings, each starting with "T" followed by exactly 3 digits, like "T012".'
        },
        message: "Teams_Involved must be an array of strings.",
    },
    Score: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                // Ensure that the value is a string in the format 'X-Y'
                return /^\d{1,2}-\d{1,2}$/.test(value);
            },
            message:
                'Score must be a string in the format "X-Y", like "1-2".',
        },
    },
    Stadium: {
        type: String,
        required: true,
        maxLength: 25,
        message: "Stadium must be a string.",
    },
    Goals: {
        type: Array,
        required: false,
        validate: {
            validator: function (value) {
                // Ensure that the array is composed of objects with the following properties:
                // Player_ID: string starting with 'P' followed by exactly 3 digits
                // Time: string representing a number between 0 and 90 composed of 2 digits
                try {
                    for (let i = 0; i < value.length; i++) {
                        if (!/^P\d{3}$/.test(value[i].Player_ID) || !/^\d{1,2}$/.test(value[i].Time) || parseInt(value[i].Time) > 90) {
                            return false;
                        }
                    }
                } catch (error) {

                    return false;
                }
            },
            message:
                'Goals must be an array of objects with the following properties: Player_ID: string starting with "P" followed by exactly 3 digits, Time: string representing a number between 0 and 90 composed of 2 digits, like "P012", "45".'
        },
    }
});

const Matches = mongoose.model('matches', matchSchema);
module.exports = Matches;
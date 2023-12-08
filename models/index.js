const dbConfig = require('../config/db.config.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.players = require('./players.js')(mongoose);
db.teams = require('./teams.js')(mongoose);
db.coaches = require('./coaches.js')(mongoose);
db.matches = require('./matches.js')(mongoose);

module.exports = db;

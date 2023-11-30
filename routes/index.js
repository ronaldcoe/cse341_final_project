//Import necessary modules
const router = require("express").Router();


//router.use("/", require("./swagger"));  // Use the "/api-docs" route defined in the "swagger" module


// Use the "/teams" route defined in the "teams" module
router.use("/teams", require("./teams"));
// Use the "/players" route defined in the "players" module
router.use("/players", require("./players"));
// Use the "/coaches" route defined in the "coaches" module
router.use("/coaches", require("./coaches"));
// Use the "/matches" route defined in the "matches" module
router.use("/matches", require("./matches"));

module.exports = router;

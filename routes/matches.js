// Import the necessary modules
const router = require("express").Router();
const matchesController = require("../controllers/matches");

router.get("/", matchesController.getAllMatches);
router.get("/:Match ID", matchesController.getSingleMatch);
router.get("/:Team ID", matchesController.getMatchesByTeamId);
router.post("/", matchesController.createMatch);

module.exports = router;

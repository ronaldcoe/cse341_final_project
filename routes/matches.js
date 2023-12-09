// Import the necessary modules
const router = require("express").Router();
const matchesController = require("../controllers/matches");

const { isAuthenticated } = require("../middleware/authenticate.js");

router.get("/", matchesController.getAllMatches);
router.get("/:Match_ID", matchesController.getMatchById);
router.get("/:Team_ID", matchesController.getMatchesByTeamId);
router.post("/", isAuthenticated, matchesController.createMatch);
router.put("/:Match_ID", isAuthenticated, matchesController.updateMatch);
router.delete("/:Match_ID", isAuthenticated, matchesController.deleteMatch);

module.exports = router;
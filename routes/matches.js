// Import the necessary modules
const router = require("express").Router();
const matchesController = require("../controllers/matches");

router.get("/", matchesController.getAllMatches);
router.get("/:Match_ID", matchesController.getMatchById);
router.get("/:Team_ID", matchesController.getMatchesByTeamId);
router.post("/", matchesController.createMatch);
router.put("/:Match_ID", matchesController.updateMatch);
router.delete("/:Match_ID", matchesController.deleteMatch);

module.exports = router;

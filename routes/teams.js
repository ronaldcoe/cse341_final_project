const router = require("express").Router();
const teamsController = require("../controllers/teams.js");

const { isAuthenticated } = require("../middleware/authenticate.js");

router.get("/", teamsController.getAllTeams);
router.get("/:Team_ID", teamsController.getTeamById);
router.post("/", isAuthenticated, teamsController.createTeam);
router.put("/:Team_ID", isAuthenticated, teamsController.updateTeam);
router.delete("/:Team_ID", isAuthenticated, teamsController.deleteTeam);

module.exports = router;

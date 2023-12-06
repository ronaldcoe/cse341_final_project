const router = require("express").Router();
const teamsController = require("../controllers/teams.js");

router.get("/", teamsController.getAllTeams);
router.get("/:Team_ID", teamsController.getTeamById);
router.post("/", teamsController.createTeam);
router.put("/:Team_ID", teamsController.updateTeam);
router.delete("/:Team_ID", teamsController.deleteTeam);

module.exports = router;

const router = require("express").Router();
const teamsController = require("../controllers/teams.js");

router.get("/", teamsController.getAllTeams);
router.get("/:Team ID", teamsController.getTeamById);
router.post("/", teamsController.createTeam);
router.put("/:Team ID", teamsController.updateTeam);
router.delete("/:Team ID", teamsController.deleteTeam);

module.exports = router;

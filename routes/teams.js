const router = require("express").Router();
const teamsController = require("../controllers/teams");

router.get("/", teamsController.getAllTeams);
router.get("/:Team ID", teamsController.getSingleTeam);
router.post("/", teamsController.createTeam);

module.exports = router;

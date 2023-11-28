// Import the necessary modules
const router = require("express").Router();
const playersController = require("../controllers/players");

router.get("/", playersController.getAllPlayers);
router.get("/:Player ID", playersController.getSinglePlayer);
router.get("/:Position", playersController.getPlayersByPosition);
router.post("/", playersController.createPlayer);

module.exports = router;

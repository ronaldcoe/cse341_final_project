// Import the necessary modules
const router = require("express").Router();
const playersController = require("../controllers/players");

router.get("/", playersController.getAllPlayers);
router.get("/:Player ID", playersController.getPlayerById);
router.get("/:Position", playersController.getPlayersByPosition);
router.post("/", playersController.createPlayer);
router.put("/:Player ID", playersController.updatePlayer);
router.delete("/:Player ID", playersController.deletePlayer);

module.exports = router;

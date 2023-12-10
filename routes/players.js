// Import the necessary modules
const router = require("express").Router();
const playersController = require("../controllers/players");

const { isAuthenticated } = require("../middleware/authenticate.js");

router.get("/", playersController.getAllPlayers);
router.get("/:Player_ID", playersController.getPlayerById);
router.get("/:Position", playersController.getPlayersByPosition);
router.post("/", isAuthenticated, playersController.createPlayer);
router.put("/:Player_ID", isAuthenticated, playersController.updatePlayer);
router.delete("/:Player_ID", isAuthenticated, playersController.deletePlayer);

module.exports = router;
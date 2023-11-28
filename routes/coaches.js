// Import the necessary modules
const router = require("express").Router();
const coachesController = require("../controllers/coaches");

router.get("/", coachesController.getAllCoaches);
router.get("/:Coach ID", coachesController.getSingleCoach);
router.post("/", coachesController.createCoach)

module.exports = router;
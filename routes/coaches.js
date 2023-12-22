// Import the necessary modules
const router = require("express").Router();

const coachesController = require("../controllers/coaches");
const { isAuthenticated } = require("../middleware/authenticate.js");

router.get("/", coachesController.getAllCoaches);
router.get("/:Coach_ID", coachesController.getCoachById);
router.post("/", isAuthenticated, coachesController.createCoach);
router.put("/:Coach_ID", isAuthenticated, coachesController.updateCoach);
router.delete("/:Coach_ID", isAuthenticated, coachesController.deleteCoach);

module.exports = router;
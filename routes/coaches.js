// Import the necessary modules
const router = require("express").Router();

const coachesController = require("../controllers/coaches");

router.get("/", coachesController.getAllCoaches);
router.get("/:Coach_ID", coachesController.getCoachById);
router.post("/", coachesController.createCoach);
router.put("/:Coach_ID", coachesController.updateCoach);
router.delete("/:Coach_ID", coachesController.deleteCoach);

module.exports = router;

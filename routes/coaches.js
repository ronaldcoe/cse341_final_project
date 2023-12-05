// Import the necessary modules
const router = require("express").Router();

const coachesController = require("../controllers/coaches");

router.get("/", coachesController.getAllCoaches);
router.get("/:Coach ID", coachesController.getCoachById);
router.post("/", coachesController.createCoach);
router.put("/:Coach ID", coachesController.updateCoach);
router.delete("/:Coach ID", coachesController.deleteCoach);

module.exports = router;

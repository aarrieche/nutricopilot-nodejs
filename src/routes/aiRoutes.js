const express = require("express");
const router = express.Router();
const controller = require("../controllers/aiController");

router.post("/suggestions", controller.generateSuggestions);
router.post("/calculate-calories", controller.calculateCalories);

module.exports = router;

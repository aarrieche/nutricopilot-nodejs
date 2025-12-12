const express = require("express");
const router = express.Router();
const controller = require("../controllers/patientsController");

router.get("/", controller.list);
router.get("/:id", controller.find);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;

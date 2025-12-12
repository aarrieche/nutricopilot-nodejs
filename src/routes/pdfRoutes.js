const express = require("express");
const router = express.Router();
const controller = require("../controllers/pdfController");

router.get("/diets/:id/pdf", controller.generateDietPdf);

module.exports = router;

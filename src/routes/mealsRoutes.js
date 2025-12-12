const express = require("express");
const router = express.Router();
const controller = require("../controllers/mealsController");
const model = require("../models/mealModel");

router.post("/", controller.create);

router.get("/by-diet/:dietas_id", async (req, res) => {
  try {
    const data = await model.getByDiet(req.params.dietas_id);
    res.json(data);
  } catch {
    res.status(500).json({ error: "Erro ao procurar refeicoes" });
  }
});

module.exports = router;

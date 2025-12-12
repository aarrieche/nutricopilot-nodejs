const model = require("../models/mealModel");

exports.create = async (req, res) => {
  try {
    const {
      dietas_id,
      nome,
      tipo_refeicao,
      descricao,
      calorias,
      proteinas,
      carboidratos,
      gorduras
    } = req.body;

    if (!dietas_id || !nome) {
      return res.status(400).json({ error: "dietas_id e nome são obrigatórios" });
    }

    const meal = await model.create({
      dietas_id,
      nome,
      tipo_refeicao,
      descricao,
      calorias,
      proteinas,
      carboidratos,
      gorduras
    });

    res.status(201).json(meal);

  } catch {
    res.status(500).json({ error: "Erro ao salvar refeição" });
  }
};

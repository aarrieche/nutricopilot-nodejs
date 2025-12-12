const { generate } = require("../services/openaiService");
const {
  buildMealSuggestionPrompt,
  buildCaloriePrompt
} = require("../services/promptService");

exports.calculateCalories = async (req, res) => {
  try {
    const prompt = buildCaloriePrompt(req.body);
    const result = await generate(prompt);
    res.json(result);
  } catch (error) {
    console.error(" Erro ao calcular calorias:", error);
    res.status(500).json({ calories: 0 });
  }
};

exports.generateSuggestions = async (req, res) => {
  try {
    const prompt = buildMealSuggestionPrompt(req.body);
    const result = await generate(prompt);
    res.json(result);
  } catch (err) {
    console.error(" Erro nas sugestões IA:", err);
    res.status(500).json({
      tip: "Erro ao gerar recomendações.",
      foods: []
    });
  }
};

const dietModel = require("../models/dietModel");
const prisma = require("../config/prisma");

module.exports = {
  async create(req, res) {
    try {
      const { refeicoes = [], ...data } = req.body;

      const dieta = await dietModel.create(data);

      await prisma.refeicao.createMany({
        data: refeicoes.map((r) => ({
          nome: r.nome,
          tipo_refeicao: r.tipo_refeicao,
          descricao: r.descricao,
          calorias: r.calorias || 0,
          proteinas: r.proteinas || 0,
          carboidratos: r.carboidratos || 0,
          gorduras: r.gorduras || 0,
          dietas_id: dieta.id,
        })),
      });

      const dietaCompleta = await prisma.dieta.findUnique({
        where: { id: dieta.id },
        include: { refeicoes: true }
      });

      res.status(201).json(dietaCompleta);

    } catch (error) {
      console.error("Erro ao criar dieta:", error);
      res.status(500).json({ error: "Erro ao criar dieta" });
    }
  },

  async getAll(req, res) {
    const data = await dietModel.getAll();
    res.json(data);
  },

  async getById(req, res) {
    const dieta = await prisma.dieta.findUnique({
      where: { id: Number(req.params.id) },
      include: { refeicoes: true }
    });

    if (!dieta) return res.status(404).json({ error: "Dieta não encontrada" });
    res.json(dieta);
  },

  async delete(req, res) {
    try {
      await prisma.dieta.delete({
        where: { id: Number(req.params.id) },
      });

      res.json({ message: "Dieta removida com sucesso" });

    } catch (error) {
      res.status(500).json({ error: "Erro ao remover dieta" });
    }
  }
};

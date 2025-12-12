const prisma = require("../config/prisma");

module.exports = {

  getAll: () =>
    prisma.refeicao.findMany({ orderBy: { id: "desc" } }),

  getByDiet: (dietas_id) =>
    prisma.refeicao.findMany({
      where: { dietas_id: Number(dietas_id) },
      orderBy: { id: "desc" }
    }),

  create: (data) =>
    prisma.refeicao.create({ data }),

  remove: (id) =>
    prisma.refeicao.delete({ where: { id: Number(id) } })
};

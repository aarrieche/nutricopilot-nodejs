const prisma = require("../config/prisma");

/* 🔢 Mesmas funções auxiliares */
function calcularTMB({ peso, altura, idade, sexo }) {
  if (sexo === 'masculino' || sexo === 'M')
    return 88.36 + (13.4 * peso) + (4.8 * altura) - (5.7 * idade);
  return 447.6 + (9.2 * peso) + (3.1 * altura) - (4.3 * idade);
}

function calcularMacros(tmb) {
  return {
    carboidratos_g: (0.40 * tmb) / 4,
    proteinas_g: (0.40 * tmb) / 4,
    gorduras_g: (0.20 * tmb) / 9
  };
}

module.exports = {

  getAll: () =>
    prisma.paciente.findMany({ orderBy: { id: "desc" } }),

  getById: (id) =>
    prisma.paciente.findUnique({ where: { id: Number(id) } }),

  create: async (data) => {
    const tmb = calcularTMB(data);
    const macros = calcularMacros(tmb);

    return prisma.paciente.create({
      data: { ...data, tmb, ...macros }
    });
  },

  update: async (id, data) => {
    const tmb = calcularTMB(data);
    const macros = calcularMacros(tmb);

    return prisma.paciente.update({
      where: { id: Number(id) },
      data: { ...data, tmb, ...macros }
    });
  },

  remove: async (id) => {
    await prisma.paciente.delete({ where: { id: Number(id) } });
    return true;
  }
};

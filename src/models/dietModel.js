const prisma = require("../config/prisma");

async function getAll() {
  return prisma.dieta.findMany({
    orderBy: [
      { data_dieta: "desc" },
      { id: "desc" }
    ]
  });
}

async function getById(id) {
  return prisma.dieta.findUnique({
    where: { id: Number(id) }
  });
}

async function getByPaciente(pacientes_id) {
  return prisma.dieta.findMany({
    where: { pacientes_id: Number(pacientes_id) },
    orderBy: [
      { data_dieta: "desc" },
      { id: "desc" }
    ]
  });
}

async function create(data) {
  const {
    nome,
    tipo,
    objetivo,
    calorias_totais,
    proteinas_totais,
    carboidratos_totais,
    gorduras_totais,
    data_inicio,
    data_fim,
    obs,
    pacientes_id,
    nome_dieta,
    data_dieta,
  } = data;

  return prisma.dieta.create({
    data: {
      nome,
      tipo: tipo || "",
      objetivo: objetivo || "",
      calorias_totais,
      proteinas_totais: proteinas_totais || 0,
      carboidratos_totais: carboidratos_totais || 0,
      gorduras_totais: gorduras_totais || 0,
      data_inicio: data_inicio ? new Date(data_inicio) : new Date(),
      data_fim: data_fim ? new Date(data_fim) : null,
      obs: obs || "",
      pacientes_id,
      nome_dieta: nome_dieta || nome,
      data_dieta: data_dieta ? new Date(data_dieta) : new Date(),
    }
  });
}

async function update(id, data) {
  return prisma.dieta.update({
    where: { id: Number(id) },
    data
  });
}

async function remove(id) {
  await prisma.dieta.delete({
    where: { id: Number(id) }
  });
}

module.exports = {
  getAll,
  getById,
  getByPaciente,
  create,
  update,
  remove
};

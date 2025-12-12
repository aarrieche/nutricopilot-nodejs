const patientsModel = require("../models/patientModel");

async function list(req, res) {
  try {
    const data = await patientsModel.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function find(req, res) {
  try {
    const data = await patientsModel.getById(req.params.id);
    if (!data) return res.status(404).json({ error: "Paciente não encontrado" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function create(req, res) {
  try {
    const data = await patientsModel.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function update(req, res) {
  try {
    const data = await patientsModel.update(req.params.id, req.body);
    if (!data) return res.status(404).json({ error: "Paciente não encontrado" });
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function remove(req, res) {
  try {
    await patientsModel.remove(req.params.id);
    res.json({ message: "Paciente e todas as dietas vinculadas removidos com sucesso" });
  } catch {
    res.status(500).json({ error: "Erro ao remover paciente" });
  }
}

module.exports = { list, find, create, update, remove };

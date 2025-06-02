const markModel = require('../models/markModel');

const createMark = async (req, res) => {
  const { studentId, subject, mark } = req.body;
  const newMark = await markModel.createMark(studentId, subject, mark);
  res.json(newMark);
};

const getAllMarks = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  const { marks, totalCount } = await markModel.getAllMarks(limit, offset);

  const totalPages = Math.ceil(totalCount / limit);
  res.json({ marks, totalPages });
};

const getMarkById = async (req, res) => {
  const mark = await markModel.getMarkById(req.params.id);
  res.json({ mark });
};

const updateMark = async (req, res) => {
  const { id } = req.params;
  const { studentId, subject, mark } = req.body;
  const updatedMark = await markModel.updateMark(id, studentId, subject, mark);
  res.json(updatedMark);
};

const deleteMark = async (req, res) => {
  const { id } = req.params;
  await markModel.deleteMark(id);
  res.status(204).send();
};

module.exports = {
  createMark,
  getAllMarks,
  getMarkById,
  updateMark,
  deleteMark,
};

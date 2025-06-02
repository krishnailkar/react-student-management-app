const studentModel = require('../models/studentModel');
const markModel = require('../models/markModel');

const createStudent = async (req, res) => {
  const { name, age, email } = req.body;
  const student = await studentModel.createStudent(name, age, email);
  res.json(student);
};

const getAllStudents = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  const { students, totalCount } = await studentModel.getAllStudents(limit, offset);

  const totalPages = Math.ceil(totalCount / limit);
  res.json({ students, totalPages });
};

const getStudentById = async (req, res) => {
  const student = await studentModel.getStudentById(req.params.id);
  const marks = await markModel.getMarksByStudentId(req.params.id);
  res.json({ student, marks });
};

const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;
  const updatedStudent = await studentModel.updateStudent(id, name, age, email);
  res.json(updatedStudent);
};

const deleteStudent = async (req, res) => {
  const { id } = req.params;
  await studentModel.deleteStudent(id);
  res.status(204).send();
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};

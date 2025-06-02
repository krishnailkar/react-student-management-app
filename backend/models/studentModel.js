const db = require('../config/db');

const createStudent = async (name, age, email) => {
  const result = await db.query(
    'INSERT INTO students (name, age, email) VALUES ($1, $2, $3) RETURNING *',
    [name, age, email]
  );
  return result.rows[0];
};

const getAllStudents = async (limit, offset) => {
  const result = await db.query(
    'SELECT * FROM students ORDER BY created_at LIMIT $1 OFFSET $2',
    [limit, offset]
  );
  
  const totalCountResult = await db.query('SELECT COUNT(*) FROM students');
  const totalCount = parseInt(totalCountResult.rows[0].count);

  return {
    students: result.rows,
    totalCount: totalCount
  };
};

const getStudentById = async (id) => {
  const result = await db.query('SELECT * FROM students WHERE id = $1', [id]);
  return result.rows[0];
};

const updateStudent = async (id, name, age, email) => {
  const result = await db.query(
    'UPDATE students SET name = $1, age = $2, email = $3 WHERE id = $4 RETURNING *',
    [name, age, email, id]
  );
  return result.rows[0];
};

const deleteStudent = async (id) => {
  await db.query('DELETE FROM marks WHERE student_id = $1', [id]);
  await db.query('DELETE FROM students WHERE id = $1', [id]);
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};

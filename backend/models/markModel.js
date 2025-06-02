const db = require('../config/db');

const createMark = async (student_id, subject, mark) => {
  const result = await db.query(
    'INSERT INTO marks (student_id, subject, mark) VALUES ($1, $2, $3) RETURNING *',
    [student_id, subject, mark]
  );
  return result.rows[0];
};

const getAllMarks = async (limit, offset) => {
  const result = await db.query(
    'SELECT * FROM marks ORDER BY id DESC LIMIT $1 OFFSET $2',
    [limit, offset]
  );

  const totalCountResult = await db.query('SELECT COUNT(*) FROM marks');
  const totalCount = parseInt(totalCountResult.rows[0].count);

  return {
    marks: result.rows,
    totalCount: totalCount,
  };
};

const getMarkById = async (id) => {
  const result = await db.query('SELECT * FROM marks WHERE id = $1', [id]);
  return result.rows[0];
};

const getMarksByStudentId = async (student_id) => {
  const result = await db.query('SELECT * FROM marks WHERE student_id = $1', [student_id]);
  return result.rows;
};

const updateMark = async (id, student_id, subject, mark) => {
  const result = await db.query(
    'UPDATE marks SET student_id = $1, subject = $2, mark = $3 WHERE id = $4 RETURNING *',
    [student_id, subject, mark, id]
  );
  return result.rows[0];
};

const deleteMark = async (id) => {
  await db.query('DELETE FROM marks WHERE id = $1', [id]);
};

module.exports = {
  createMark,
  getAllMarks,
  getMarkById,
  getMarksByStudentId,
  updateMark,
  deleteMark,
};

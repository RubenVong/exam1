const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "examuser",
  password: "exampass",
  database: "exam1",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const Course = {
  // Create
  async create(courseData) {
    const { courseNo, courseDesc, lastSemTaught, maxStudents } = courseData;
    const sql = `INSERT INTO courses (courseNo, courseDesc, lastSemTaught, maxStudents) VALUES (?, ?, ?, ?)`;
    const [result] = await pool.execute(sql, [courseNo, courseDesc, lastSemTaught, maxStudents]);
    return result.insertId;
  },

  // Read All
  async findAll() {
    const sql = `SELECT courseID, courseNo, courseDesc, lastSemTaught, maxStudents FROM courses`;
    const [rows] = await pool.execute(sql);
    return rows;
  },

  // Read One by ID
  async findById(id) {
    const sql = `SELECT courseID, courseNo, courseDesc, lastSemTaught, maxStudents FROM courses WHERE courseID = ?`;
    const [rows] = await pool.execute(sql, [id]);
    return rows[0] || null;
  }
};

module.exports = Course;

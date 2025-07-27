import pool from "../configs/db.js";

const enrollmentsDB = {
  async enroll(studentId: number, courseId: number) {
    const query = `
      INSERT INTO Enrollments (student_id, course_id)
      VALUES ($1, $2)
      RETURNING *;
    `;
    try {
      const result = await pool.query(query, [studentId, courseId]);
      return result.rows[0];
    } catch (error) {
      console.error("Error enrolling student in course:", error);
      throw error;
    }
  },

  async getCoursesByStudent(studentId: number) {
    const query = `
      SELECT c.*
      FROM Courses c
      INNER JOIN Enrollments e ON c.id = e.course_id
      WHERE e.student_id = $1;
    `;
    try {
      const result = await pool.query(query, [studentId]);
      return result.rows;
    } catch (error) {
      console.error("Error fetching courses by student:", error);
      throw error;
    }
  },
async getStudentsByCourse(courseId: number) {
  const query = `
    SELECT u.*
    FROM Users u
    INNER JOIN Enrollments e ON u.id = e.student_id
    WHERE e.course_id = $1;
  `;
  try {
    const result = await pool.query(query, [courseId]);
    return result.rows;
  } catch (error) {
    console.error("Error fetching students by course:", error);
    throw error;
  }
}
,
  async isAlreadyEnrolled(studentId: number, courseId: number) {
    const query = `
      SELECT * FROM Enrollments
      WHERE student_id = $1 AND course_id = $2;
    `;
    try {
      const result = await pool.query(query, [studentId, courseId]);
      return (result.rowCount ?? 0) > 0;
    } catch (error) {
      console.error("Error checking enrollment:", error);
      throw error;
    }
  }
};

export default enrollmentsDB;

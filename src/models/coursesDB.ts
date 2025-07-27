import pool from "../configs/db.js";

interface NewCourse {
  title: string;
  description: string;
  duration: number;
  price: number;
  video_path: string;
}

const coursesDB = {
  async getAllCourses() {
    const query = "SELECT * FROM Courses";
    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error fetching all courses:", error);
      throw error;
    }
  },

  async createCourses(newCourse: NewCourse) {
    const query = `
      INSERT INTO Courses (title, description, duration, price, video_path)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`;
    const values = [
      newCourse.title,
      newCourse.description,
      newCourse.duration,
      newCourse.price,
      newCourse.video_path,
    ];
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error creating course:", error);
      throw error;
    }
  },

  async getCoursesById(id: number) {
    const query = "SELECT * FROM Courses WHERE id = $1";
    const value = [id];
    try {
      const result = await pool.query(query, value);
      return result.rows[0];
    } catch (error) {
      console.error("Error fetching course by id:", error);
      throw error;
    }
  },

  async updateCourse(id: number, updatedData: Partial<NewCourse>) {
    const { title, description, duration, price, video_path } = updatedData;

    const query = `
      UPDATE Courses SET 
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        duration = COALESCE($3, duration),
        price = COALESCE($4, price),
        video_path = COALESCE($5, video_path),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *;
    `;
    const values = [title, description, duration, price, video_path, id];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error updating course:", error);
      throw error;
    }
  },

  async deleteCourse(id: number) {
    const query = "DELETE FROM Courses WHERE id = $1 RETURNING *";
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      console.error("Error deleting course:", error);
      throw error;
    }
  },
};

export default coursesDB;

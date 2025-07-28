import pool from "../configs/db.js";

const userDB = {
  async CreateUser(
    username: string,
    email: string,
    password: string,
    role: string
  ) {
    const query =
      "INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [username, email, password, role];
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  async getUserByEmail(email: string) {
    const query = "SELECT * FROM users WHERE email = $1";
    const value = [email];
    try {
      const result = await pool.query(query, value);
      return result.rows[0];
    } catch (error) {
      console.error("Error fetching user by email:", error);
      throw error;
    }
  },

  async saveRefreshToken(userId: number, refreshToken: string) {
    const query = "UPDATE users SET refresh_token = $1 WHERE id = $2";
    try {
      await pool.query(query, [refreshToken, userId]);
    } catch (error) {
      console.error("Error saving refresh token:", error);
      throw error;
    }
  },

  async updatePassword(userId: number, newPassword: string) {
    const query = "UPDATE users SET password = $1 WHERE id = $2";
    const values = [newPassword, userId];
    try {
      await pool.query(query, values);
      return { success: true, message: "Password updated successfully" };
    } catch (error) {
      console.error("Error updating password:", error);
      return { success: false, message: "Failed to update password" };
    }
  },

  async getUserById(id: number) {
    const query = "SELECT * FROM users WHERE id = $1";
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw error;
    }
  },
};

export default userDB;

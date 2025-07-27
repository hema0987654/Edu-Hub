import {Pool}from "pg";
import dotenv from "dotenv";
dotenv.config();
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432", 10),
});

pool.on("connect", () => {
  console.log("Connected to the database");
});
 pool.on("error",()=>{
    console.log("dataBase is not connect");
    
 })

export default pool;
import express from "express";
import dotenv from "dotenv";
import router from "./routes/authRoute.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import routerCours from "./routes/coursesRoute.js";
import videoRouter from "./routes/videoRoute.js";
import pool from "./configs/db.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import morgan from "morgan";
import swaggerDocs from "./configs/swagger.js"; 


dotenv.config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message:
      "Too many requests from this IP, please try again after 15 minutes.",
  },
});

const app = express();
swaggerDocs(app); 
app.use(limiter);
app.use(express.json());
app.use(helmet());
app.use(cors());
// app.use(cors({
//   origin: "http://localhost:3000",
//   credentials: true
// }));
app.use(morgan("combined"));
app.use("/auth", router);
app.use("/courses", routerCours);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/uploads", express.static("src/uploads"));
app.use("/api/videos", videoRouter);

const PORT = process.env.PORT || 8000;

pool
  .connect()
  .then(() => {
    console.log("✅ Database connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to the database:", err);
  });

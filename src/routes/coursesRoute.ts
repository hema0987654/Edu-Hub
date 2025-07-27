import { Router, Request, Response } from "express";
import CourseService from "../services/coursesService.js";
import CourseControllers from "../controllers/coursescontrollers.js";
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware.js";

const routerCours = Router();
const courseService = new CourseService();
const courseControllers = new CourseControllers(courseService);

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Get all courses
 *     responses:
 *       200:
 *         description: List of all courses
 */
routerCours.get("/", async (req: Request, res: Response) => {
  await courseControllers.getAllcourse(req, res);
});

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Get course by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course data
 *       404:
 *         description: Course not found
 */
routerCours.get("/:id", async (req: Request, res: Response) => {
  await courseControllers.getCourseById(req, res);
});

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Create a new course (admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Course created successfully
 *       403:
 *         description: Unauthorized
 */
routerCours.post(
  "/",
  authenticateToken,
  authorizeRoles("admin"),
  async (req: Request, res: Response) => {
    await courseControllers.createCourse(req, res);
  }
);

/**
 * @swagger
 * /courses/{id}:
 *   patch:
 *     summary: Update course by ID (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       403:
 *         description: Unauthorized
 */
routerCours.patch(
  "/:id",
  authenticateToken,
  authorizeRoles("admin"),
  async (req: Request, res: Response) => {
    await courseControllers.updateCourse(req, res);
  }
);

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Delete course by ID (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       403:
 *         description: Unauthorized
 */
routerCours.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("admin"),
  async (req: Request, res: Response) => {
    await courseControllers.deleteCourse(req, res);
  }
);

export default routerCours;

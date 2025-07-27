import { Router, Request, Response } from "express";
import EnrollmentService from "../services/enrollmentService.js";
import EnrollmentController from "../controllers/enrollmentController.js";
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = Router();
const enrollmentService = new EnrollmentService();
const enrollmentController = new EnrollmentController(enrollmentService);

/**
 * @swagger
 * /enrollments/enroll:
 *   post:
 *     summary: Enroll a student in a course
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Enrollments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Enrollment successful
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Unauthorized
 */
router.post(
  "/enroll",
  authenticateToken,
  authorizeRoles("student"),
  async (req: Request, res: Response) => {
    await enrollmentController.enroll(req, res);
  }
);

/**
 * @swagger
 * /enrollments/my-courses:
 *   get:
 *     summary: Get courses enrolled by the authenticated student
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Enrollments
 *     responses:
 *       200:
 *         description: List of enrolled courses
 *       403:
 *         description: Unauthorized
 */
router.get(
  "/my-courses",
  authenticateToken,
  authorizeRoles("student"),
  async (req: Request, res: Response) => {
    await enrollmentController.getMyCourses(req, res);
  }
);

/**
 * @swagger
 * /enrollments/course/{courseId}/students:
 *   get:
 *     summary: Get students enrolled in a specific course (admin only)
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Enrollments
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of students
 *       403:
 *         description: Unauthorized
 */
router.get(
  "/course/:courseId/students",
  authenticateToken,
  authorizeRoles("admin"),
  async (req: Request, res: Response) => {
    await enrollmentController.getStudentsInCourse(req, res);
  }
);

export default router;

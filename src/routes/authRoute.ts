import { Router, Request, Response } from 'express';
import AuthService from '../services/authService.js';
import AuthControllers from '../controllers/authController.js';
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = Router();
const authService = new AuthService();
const authController = new AuthControllers(authService);

/**
 * @swagger
 * /auth:
 *   get:
 *     summary: Welcome message
 *     responses:
 *       200:
 *         description: Returns a welcome message
 */
router.get('/', (req: Request, res: Response) => {
  res.send("welcom ");
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logged in successfully
 */
router.post('/login', (req: Request, res: Response) => {
  authController.login(req, res);
});

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post('/register', (req: Request, res: Response) => {
  authController.register(req, res);
});

/**
 * @swagger
 * /auth/request-reset-password:
 *   post:
 *     summary: Request password reset
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset link sent
 */
router.post('/request-reset-password', (req: Request, res: Response) => {
  authController.requestResetPassword(req, res);
});

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns the user profile
 */
router.get('/profile', authenticateToken, (req: Request, res: Response) => {
  res.json({ message: `Welcome ${req.user?.email}` });
});

/**
 * @swagger
 * /auth/admin-only:
 *   get:
 *     summary: Admin-only route
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns message for admin
 */
router.get('/admin-only', authenticateToken, authorizeRoles("admin"), (req: Request, res: Response) => {
  res.json({ message: `Hello admin ${req.user?.email}` });
});

/**
 * @swagger
 * /auth/student-only:
 *   get:
 *     summary: Student-only route
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns message for student
 */
router.get('/student-only', authenticateToken, authorizeRoles("student"), (req: Request, res: Response) => {
  res.json({ message: `Hello student ${req.user?.email}` });
});

export default router;

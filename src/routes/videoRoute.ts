import { Router, Request, Response } from "express";
import { uploadVideo } from "../middleware/videoUpload.js";
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * /videos/upload:
 *   post:
 *     summary: Upload a video file (admin only)
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Videos
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               video:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Video uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 videoPath:
 *                   type: string
 *       400:
 *         description: No video uploaded
 *       403:
 *         description: Unauthorized
 */
router.post(
  "/upload",
  authenticateToken,
  authorizeRoles("admin"),
  uploadVideo,
  (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ message: "No video uploaded" });
    }

    const videoPath = `uploads/videos/${req.file.filename}`;
    res.status(200).json({
      success: true,
      message: "Video uploaded successfully",
      videoPath,
    });
  }
);

export default router;

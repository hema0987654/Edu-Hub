import { Request, Response } from "express";
import EnrollmentService from "../services/enrollmentService.js";

class EnrollmentController {
  constructor(private enrollmentService: EnrollmentService) {}

  async enroll(req: Request, res: Response) {
    const studentId = req.user?.id;
    const { courseId } = req.body;

    if (!studentId || !courseId) {
      return res.status(400).json({ message: "Student ID or Course ID is missing" });
    }

    const result = await this.enrollmentService.enroll(studentId, courseId);

    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }

    return res.status(201).json(result);
  }

  async getMyCourses(req: Request, res: Response) {
    const studentId = req.user?.id;

    if (!studentId) {
      return res.status(400).json({ message: "Student ID is missing" });
    }

    const result = await this.enrollmentService.getCoursesByStudent(studentId);

    if (!result.success) {
      return res.status(500).json({ message: result.message });
    }

    return res.status(200).json(result);
  }

  async getStudentsInCourse(req: Request, res: Response) {
    const courseId = parseInt(req.params.courseId);

    if (isNaN(courseId)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }

    const result = await this.enrollmentService.getStudentsByCourse(courseId);

    if (!result.success) {
      return res.status(500).json({ message: result.message });
    }

    return res.status(200).json(result);
  }
}

export default EnrollmentController;


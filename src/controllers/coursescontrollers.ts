import CourseService from "../services/coursesService.js";
import { Request, Response } from "express";

class CourseControllers {
  constructor(private courses: CourseService) {}

  async getAllcourse(req: Request, res: Response) {
    try {
      const result = await this.courses.getAllcourse();

      if (!result.success) {
        return res.status(500).json({ message: result.message });
      }

      return res.status(200).json(result);
    } catch (error) {
      console.error("Error in controller while fetching all courses:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async createCourse(req: Request, res: Response) {
    const { title, description, duration, price, video_path } = req.body;
    try {
      const result = await this.courses.createCourse({
        title,
        description,
        duration,
        price,
        video_path,
      });

      if (!result.success) {
        return res.status(500).json({ message: result.message });
      }

      return res.status(201).json(result);
    } catch (error) {
      console.error("Error in controller while creating course:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getCourseById(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }

    try {
      const result = await this.courses.getCourseById(id);

      if (!result.success) {
        return res.status(404).json({ message: result.message });
      }

      return res.status(200).json(result);
    } catch (error) {
      console.error("Error in controller while fetching course:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateCourse(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const { title, description, duration, price, video_path } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }

    try {
      const result = await this.courses.updateCourse(id, {
        title,
        description,
        duration,
        price,
        video_path,
      });

      if (!result.success) {
        return res.status(404).json({ message: result.message });
      }

      return res.status(200).json(result);
    } catch (error) {
      console.error("Error in controller while updating course:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteCourse(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }

    try {
      const result = await this.courses.deleteCourse(id);

      if (!result.success) {
        return res.status(404).json({ message: result.message });
      }

      return res.status(200).json(result);
    } catch (error) {
      console.error("Error in controller while deleting course:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default CourseControllers;

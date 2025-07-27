import coursesDB from "../models/coursesDB.js";

interface NewCourse {
  title: string;
  description: string;
  duration: number;
  price: number;
  video_path: string;
}

class CourseService {
  async getAllcourse() {
    try {
      const courses = await coursesDB.getAllCourses();
      return { success: true, courses };
    } catch (error) {
      console.error("Error fetching all courses:", error);
      return { success: false, message: "Failed to fetch courses" };
    }
  }

  async createCourse(newCourse: NewCourse) {
    try {
      const course = await coursesDB.createCourses(newCourse);
      return { success: true, message: "Course created successfully", course };
    } catch (error) {
      console.error("Error in service while creating course:", error);
      return { success: false, message: "Failed to create course" };
    }
  }

  async getCourseById(id: number) {
    try {
      const course = await coursesDB.getCoursesById(id);
      if (!course) {
        return { success: false, message: "Course not found" };
      }
      return { success: true, course };
    } catch (error) {
      console.error("Error fetching course by ID:", error);
      return { success: false, message: "Failed to fetch course" };
    }
  }

  async updateCourse(id: number, updatedData: Partial<NewCourse>) {
    try {
      const existingCourse = await coursesDB.getCoursesById(id);
      if (!existingCourse) {
        return { success: false, message: "Course not found" };
      }

      const updatedCourse = await coursesDB.updateCourse(id, updatedData);
      return {
        success: true,
        message: "Course updated successfully",
        course: updatedCourse,
      };
    } catch (error) {
      console.error("Error updating course:", error);
      return { success: false, message: "Failed to update course" };
    }
  }

  async deleteCourse(id: number) {
    try {
      const existingCourse = await coursesDB.getCoursesById(id);
      if (!existingCourse) {
        return { success: false, message: "Course not found" };
      }

      await coursesDB.deleteCourse(id);
      return { success: true, message: "Course deleted successfully" };
    } catch (error) {
      console.error("Error deleting course:", error);
      return { success: false, message: "Failed to delete course" };
    }
  }
}

export default CourseService;
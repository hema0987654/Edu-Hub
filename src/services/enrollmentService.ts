import enrollmentsDB from "../models/enrollmentsDB.js";

class EnrollmentService {
  
  async enroll(studentId: number, courseId: number) {
    try {
      const alreadyEnrolled = await enrollmentsDB.isAlreadyEnrolled(studentId, courseId);
      if (alreadyEnrolled) {
        return { success: false, message: "You are already enrolled in this course" };
      }

      const enrollment = await enrollmentsDB.enroll(studentId, courseId);
      return { success: true, message: "Enrollment successful", enrollment };
    } catch (error) {
      console.error("Error in enrollment service:", error);
      return { success: false, message: "Failed to enroll in course" };
    }
  }

  async getCoursesByStudent(studentId: number) {
    try {
      const courses = await enrollmentsDB.getCoursesByStudent(studentId);
      return { success: true, courses };
    } catch (error) {
      console.error("Error fetching courses by student:", error);
      return { success: false, message: "Failed to fetch courses" };
    }
  }

  async getStudentsByCourse(courseId: number) {
    try {
      const students = await enrollmentsDB.getStudentsByCourse(courseId);
      return { success: true, students };
    } catch (error) {
      console.error("Error fetching students by course:", error);
      return { success: false, message: "Failed to fetch students" };
    }
  }
}

export default EnrollmentService;

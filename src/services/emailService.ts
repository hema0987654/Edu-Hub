// email.service.ts
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

export async function sendResetEmail(toEmail: string, resetLink: string) {
  const mailOptions = {
    from: `"EduHub Support" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Reset your password",
    html: `
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
      <p>This link will expire in 15 minutes.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}


export async function sendEnrollmentEmail(toEmail: string, courseTitle: string) {
  const mailOptions = {
    from: `"EduHub" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Course Enrollment Confirmation",
    html: `
      <h3>Welcome to the course: ${courseTitle}</h3>
      <p>Thank you for enrolling! We wish you a great learning journey 🌟</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

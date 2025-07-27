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

 const sendResetEmail = async (toEmail: string, resetLink: string) => {
  await transporter.sendMail({
    from: `"EduHub Support" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Reset your password",
    html: `
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
      <p>This link will expire in 15 minutes.</p>
    `,
  });
};
export default sendResetEmail;
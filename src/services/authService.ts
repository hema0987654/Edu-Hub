import bcrypt from "bcrypt";
import userDB from "../models/autheDB.js";
import { genartRefreshToken,genartToken ,generateResetToken } from "../utils/token.js";
import {sendResetEmail} from "./emailService.js";

interface CreateUser {
  username: string;
  email: string;
  password: string;
  role: string;
}

class AuthService {
  async login(email: string, password: string) {
    try {
      const findUser = await userDB.getUserByEmail(email);

      if (!findUser) {
        return { success: false, message: "This email is not found" };
      }

      const checkPass = await bcrypt.compare(
        password,
        findUser.password as string
      );

      if (!checkPass) {
        return { success: false, message: "This password is not correct" };
      }

      const token = genartToken({ id: findUser.id, email: findUser.email,role:findUser.role });
      const refreshToken = genartRefreshToken({
        id: findUser.id,
        email: findUser.email,
        role:findUser.role
      });

      return {
        success: true,
        message: "Successful login process",
        user: findUser,
        token,
        refreshToken,
      };
    } catch (error) {
      console.error("Error during login:", error);
      return { success: false, message: "Internal server error" };
    }
  }


  async register(infoUser: CreateUser) {
    try {
      const findUser = await userDB.getUserByEmail(infoUser.email);
      if (findUser) {
        return { success: false, message: "This email already exists." };
      }

      const passwordHash = await bcrypt.hash(infoUser.password, 10);
      const newUser = await userDB.CreateUser(
        infoUser.username,
        infoUser.email,
        passwordHash,
        infoUser.role,
      );
      
      const refreshToken = genartRefreshToken({
        id: newUser.id,
        email: newUser.email,
        role:newUser.role
      });
      

      const token = genartToken({ id: newUser.id, email: newUser.email,role:newUser.role });
      await userDB.saveRefreshToken(newUser.id,refreshToken)
      newUser.refresh_token = refreshToken;
      

      return {
        success: true,
        message: "Account created successfully, welcome!",
        user: newUser,
        token,
      };
    } catch (error) {
      console.error("Error during registration:", error);
      return { success: false, message: "Internal server error" };
    }
  }
  
  async requestResetPassword(email:string) {
  const user = await userDB.getUserByEmail(email);

  if (!user) {
    return { success: false, message: "Email not found" };
  }

  const token = generateResetToken(email);
const resetLink = `http://localhost:3000/reset-password?token=${token}`;

  try {
    await sendResetEmail(email, resetLink);
    return { success: true, message: "Reset link sent to email" };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, message: "Failed to send email" };
  }
}
}

export default AuthService;
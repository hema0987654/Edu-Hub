import AuthService from "../services/authService.js";
import { Request, Response } from "express";

class AuthControllers {
  constructor(private users: AuthService) {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await this.users.login(email, password);

    if (!user.success) {
      return res.status(400).json({message: user.message });
    }

    return res.status(200).json(user);
  }

  async register(req: Request, res: Response) {
    const { username, email, password, role } = req.body;

    const newUser = await this.users.register({
      username,
      email,
      password,
      role
    });

    if (!newUser.success) {
      return res.status(400).json({ success: false, message: newUser.message });
    }

    return res.status(201).json(newUser);
  }
  async requestResetPassword(req: Request, res: Response) {
  const { email } = req.body;
  const result = await this.users.requestResetPassword(email);

  if (!result.success) {
    return res.status(400).json(result);
  }

  return res.status(200).json(result);
}

}

export default AuthControllers;

import jwt from "jsonwebtoken";

export const genartToken = (user: { id: number; email: string;role:string }) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return jwt.sign({ id: user.id, email: user.email,role:user.role }, secret, {
    expiresIn: "1h",
  });
};

export const genartRefreshToken = (user: { id: number; email: string;role:string }) => {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) {
    throw new Error(
      "JWT_REFRESH_SECRET is not defined in environment variables"
    );
  }
  return jwt.sign({ id: user.id, email: user.email,role:user.role }, secret, {
    expiresIn: "7d",
  });
};

export const generateResetToken = (email: string) => {
  return jwt.sign({ email }, process.env.JWT_SECRET as string, {
    expiresIn: "15m", 
  });
};

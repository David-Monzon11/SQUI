import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
import { sendError } from "../utils/response.js";

export interface AuthenticatedRequest extends Request {
  userId?: string;
  userEmail?: string;
}

export const authenticateJwt = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return sendError(
      res,
      "AUTH_UNAUTHORIZED",
      "Missing or invalid Authorization header",
      401
    );
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return sendError(res, "AUTH_UNAUTHORIZED", "Token not provided", 401);
  }

  try {
    const payload = jwt.verify(token, config.jwtSecret) as { userId: string; email: string };
    req.userId = payload.userId;
    req.userEmail = payload.email;
    next();
  } catch (error) {
    return sendError(res, "AUTH_TOKEN_EXPIRED", "Token is expired or invalid", 401);
  }
};

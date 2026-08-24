import { Request, Response, NextFunction } from "express";
import { sendError } from "../utils/response.js";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`[Error] ${req.method} ${req.path}:`, err);

  const statusCode = err.statusCode || 500;
  const code = err.code || "INTERNAL_SERVER_ERROR";
  const message = err.message || "An unexpected error occurred.";
  const details = err.details || undefined;

  return sendError(res, code, message, statusCode, details);
};

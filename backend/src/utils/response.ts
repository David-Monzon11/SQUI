import { Response } from "express";
import { ApiResponse } from "../types/index.js";

export const sendSuccess = <T>(
  res: Response,
  data: T,
  statusCode = 200,
  message?: string
): Response => {
  const responseBody: ApiResponse<T> = {
    success: true,
    data,
    ...(message ? { message } : {}),
  };
  return res.status(statusCode).json(responseBody);
};

export const sendError = (
  res: Response,
  code: string,
  message: string,
  statusCode = 400,
  details?: any[]
): Response => {
  const responseBody: ApiResponse = {
    success: false,
    error: {
      code,
      message,
      ...(details ? { details } : {}),
    },
  };
  return res.status(statusCode).json(responseBody);
};

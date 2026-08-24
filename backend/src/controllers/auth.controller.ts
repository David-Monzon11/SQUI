import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service.js";
import { validateRegisterInput, validateLoginInput } from "../validations/auth.validation.js";
import { sendSuccess, sendError } from "../utils/response.js";
import { AuthenticatedRequest } from "../middleware/auth.middleware.js";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validation = validateRegisterInput(req.body);
    if (!validation.isValid) {
      return sendError(res, "VALIDATION_ERROR", "Validation failed", 400, validation.errors);
    }

    const result = await authService.register(req.body);
    return sendSuccess(res, result, 201, "User registered successfully");
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validation = validateLoginInput(req.body);
    if (!validation.isValid) {
      return sendError(res, "VALIDATION_ERROR", "Validation failed", 400, validation.errors);
    }

    const result = await authService.login(req.body.email, req.body.password);
    return sendSuccess(res, result, 200, "Login successful");
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const user = await authService.getProfile(req.userId!);
    return sendSuccess(res, user, 200);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const updated = await authService.updateProfile(req.userId!, req.body);
    return sendSuccess(res, updated, 200, "Profile updated successfully");
  } catch (error) {
    next(error);
  }
};

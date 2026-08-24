import { Response, NextFunction } from "express";
import { weightService } from "../services/weight.service.js";
import { validateWeightInput } from "../validations/weight.validation.js";
import { sendSuccess, sendError } from "../utils/response.js";
import { AuthenticatedRequest } from "../middleware/auth.middleware.js";
import { formatDateToKey } from "../utils/date.js";

export const logDailyWeight = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const validation = validateWeightInput(req.body);
    if (!validation.isValid) {
      return sendError(res, "VALIDATION_ERROR", "Validation failed", 400, validation.errors);
    }

    const result = await weightService.logDailyWeight(req.userId!, req.body);
    return sendSuccess(res, result, 200, "Weight logged successfully");
  } catch (error) {
    next(error);
  }
};

export const getWeightHistory = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const days = req.query.days ? parseInt(req.query.days as string, 10) : 30;
    const history = await weightService.getWeightHistory(req.userId!, days);
    return sendSuccess(res, history, 200);
  } catch (error) {
    next(error);
  }
};

export const updateWaterIntake = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const date = (req.body.date as string) || formatDateToKey();
    const incrementMl = typeof req.body.incrementMl === "number" ? req.body.incrementMl : 250;

    const result = await weightService.updateWaterIntake(req.userId!, date, incrementMl);
    return sendSuccess(res, result, 200, "Water intake updated successfully");
  } catch (error) {
    next(error);
  }
};

export const getDailyLog = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const date = (req.query.date as string) || formatDateToKey();
    const log = await weightService.getDailyLog(req.userId!, date);
    return sendSuccess(res, log, 200);
  } catch (error) {
    next(error);
  }
};

import { Response, NextFunction } from "express";
import { summaryService } from "../services/summary.service.js";
import { sendSuccess } from "../utils/response.js";
import { AuthenticatedRequest } from "../middleware/auth.middleware.js";
import { formatDateToKey } from "../utils/date.js";

export const getDailySummary = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const date = (req.query.date as string) || formatDateToKey();
    const summary = await summaryService.getDailySummary(req.userId!, date);
    return sendSuccess(res, summary, 200);
  } catch (error) {
    next(error);
  }
};

export const getWeeklyProgress = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const progress = await summaryService.getWeeklyProgress(req.userId!);
    return sendSuccess(res, progress, 200);
  } catch (error) {
    next(error);
  }
};

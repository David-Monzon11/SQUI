import { Response, NextFunction } from "express";
import { mealService } from "../services/meal.service.js";
import { validateMealInput } from "../validations/meal.validation.js";
import { sendSuccess, sendError } from "../utils/response.js";
import { AuthenticatedRequest } from "../middleware/auth.middleware.js";
import { formatDateToKey } from "../utils/date.js";

export const createMeal = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    // Parse numerical inputs if coming from multipart form-data
    const body = {
      ...req.body,
      sugarG: req.body.sugarG ? parseFloat(req.body.sugarG) : 0,
      sodiumMg: req.body.sodiumMg ? parseFloat(req.body.sodiumMg) : 0,
      caloriesKcal: req.body.caloriesKcal ? parseFloat(req.body.caloriesKcal) : 0,
      proteinG: req.body.proteinG ? parseFloat(req.body.proteinG) : 0,
      carbsG: req.body.carbsG ? parseFloat(req.body.carbsG) : 0,
      fatG: req.body.fatG ? parseFloat(req.body.fatG) : 0,
      fiberG: req.body.fiberG ? parseFloat(req.body.fiberG) : 0,
    };

    const validation = validateMealInput(body);
    if (!validation.isValid) {
      return sendError(res, "VALIDATION_ERROR", "Validation failed", 400, validation.errors);
    }

    const result = await mealService.createMeal(req.userId!, body, req.file);
    return sendSuccess(res, result, 201, "Meal logged successfully");
  } catch (error) {
    next(error);
  }
};

export const getMealsByDate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const date = (req.query.date as string) || formatDateToKey();
    const meals = await mealService.getMealsByDate(req.userId!, date);
    return sendSuccess(res, meals, 200);
  } catch (error) {
    next(error);
  }
};

export const deleteMeal = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const result = await mealService.deleteMeal(req.userId!, id);
    return sendSuccess(res, result, 200, "Meal deleted successfully");
  } catch (error) {
    next(error);
  }
};

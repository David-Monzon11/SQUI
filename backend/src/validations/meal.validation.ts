import { MealCategory } from "../types/index.js";

const VALID_CATEGORIES: MealCategory[] = ['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK', 'DRINK'];

export const validateMealInput = (body: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!body.foodName || typeof body.foodName !== 'string') {
    errors.push('Food name is required');
  }
  if (!body.mealCategory || !VALID_CATEGORIES.includes(body.mealCategory)) {
    errors.push(`Invalid mealCategory. Must be one of: ${VALID_CATEGORIES.join(', ')}`);
  }
  if (body.sugarG !== undefined && (typeof body.sugarG !== 'number' || body.sugarG < 0)) {
    errors.push('Sugar must be a non-negative number');
  }
  if (body.sodiumMg !== undefined && (typeof body.sodiumMg !== 'number' || body.sodiumMg < 0)) {
    errors.push('Sodium must be a non-negative number');
  }

  return { isValid: errors.length === 0, errors };
};

import { isValidDateKey } from "../utils/date.js";

export const validateWeightInput = (body: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (body.weightKg === undefined || typeof body.weightKg !== 'number' || body.weightKg <= 0 || body.weightKg > 500) {
    errors.push('weightKg must be a valid number between 1 and 500');
  }
  if (body.date && !isValidDateKey(body.date)) {
    errors.push('date must be in YYYY-MM-DD format');
  }

  return { isValid: errors.length === 0, errors };
};

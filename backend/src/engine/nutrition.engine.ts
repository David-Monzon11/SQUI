import { NutritionValues, SugarStatus, SodiumStatus } from "../types/index.js";
import { NUTRITION_TARGETS, HEALTH_THRESHOLDS } from "../config/constants.js";

/**
 * Calculates estimated calories from macronutrients if not explicitly given
 */
export const calculateCalories = (proteinG: number, carbsG: number, fatG: number): number => {
  return Math.round(proteinG * 4 + carbsG * 4 + fatG * 9);
};

/**
 * Evaluates daily sugar intake status against targets
 */
export const evaluateSugarStatus = (
  consumedSugarG: number,
  targetSugarG: number = NUTRITION_TARGETS.DEFAULT_DAILY_SUGAR_RECOMMENDED_G
): SugarStatus => {
  const ratio = consumedSugarG / targetSugarG;
  if (ratio < HEALTH_THRESHOLDS.SUGAR_SAFE_RATIO) return "SAFE";
  if (ratio <= HEALTH_THRESHOLDS.SUGAR_CAUTION_RATIO) return "CAUTION";
  return "EXCEEDED";
};

/**
 * Evaluates daily sodium intake status against targets
 */
export const evaluateSodiumStatus = (
  consumedSodiumMg: number,
  targetSodiumMg: number = NUTRITION_TARGETS.DEFAULT_DAILY_SODIUM_CAP_MG
): SodiumStatus => {
  const ratio = consumedSodiumMg / targetSodiumMg;
  if (ratio < HEALTH_THRESHOLDS.SODIUM_SAFE_RATIO) return "SAFE";
  if (ratio <= HEALTH_THRESHOLDS.SODIUM_CAUTION_RATIO) return "CAUTION";
  return "EXCEEDED";
};

/**
 * Aggregates a list of meal nutrition values into a daily total
 */
export const aggregateDailyNutrition = (meals: { nutrition: NutritionValues }[]) => {
  return meals.reduce(
    (acc, meal) => {
      acc.totalSugarG += meal.nutrition.sugarG || 0;
      acc.totalSodiumMg += meal.nutrition.sodiumMg || 0;
      acc.totalCaloriesKcal += meal.nutrition.caloriesKcal || 0;
      acc.totalProteinG += meal.nutrition.proteinG || 0;
      acc.totalCarbsG += meal.nutrition.carbsG || 0;
      acc.totalFatG += meal.nutrition.fatG || 0;
      acc.totalFiberG += meal.nutrition.fiberG || 0;
      return acc;
    },
    {
      totalSugarG: 0,
      totalSodiumMg: 0,
      totalCaloriesKcal: 0,
      totalProteinG: 0,
      totalCarbsG: 0,
      totalFatG: 0,
      totalFiberG: 0,
    }
  );
};

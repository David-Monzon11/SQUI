import { SugarStatus, SodiumStatus } from "../types/index.js";

export interface HealthScoreInput {
  waterIntakeMl: number;
  targetWaterMl: number;
  sugarStatus: SugarStatus;
  sodiumStatus: SodiumStatus;
  mealCount: number;
}

/**
 * Computes a balanced 0-100 Daily Health Score:
 * - Hydration (20%)
 * - Sugar balance (30%)
 * - Sodium balance (30%)
 * - Logging completeness (20%)
 */
export const calculateDailyHealthScore = (input: HealthScoreInput): number => {
  let score = 0;

  // 1. Hydration (max 20)
  const hydrationRatio = Math.min(input.waterIntakeMl / (input.targetWaterMl || 2500), 1.0);
  score += Math.round(hydrationRatio * 20);

  // 2. Sugar compliance (max 30)
  if (input.sugarStatus === "SAFE") score += 30;
  else if (input.sugarStatus === "CAUTION") score += 20;
  else score += 5;

  // 3. Sodium compliance (max 30)
  if (input.sodiumStatus === "SAFE") score += 30;
  else if (input.sodiumStatus === "CAUTION") score += 20;
  else score += 5;

  // 4. Meal logging consistency (max 20)
  if (input.mealCount >= 3) score += 20;
  else if (input.mealCount >= 1) score += 10;

  return Math.min(Math.max(score, 0), 100);
};

/**
 * Generates empowering, non-judgmental SQUI companion reflections
 */
export const generateSquirrelReflection = (
  sugarStatus: SugarStatus,
  sodiumStatus: SodiumStatus,
  waterIntakeMl: number,
  mealCount: number
): { positiveHabits: string[]; improvementAreas: string[]; squirrelTip: string } => {
  const positiveHabits: string[] = [];
  const improvementAreas: string[] = [];

  if (sugarStatus === "SAFE") {
    positiveHabits.push("Mindful sugar choices kept you well within your healthy zone today.");
  } else {
    improvementAreas.push("Higher sugar intake noticed. Consider fresh whole fruits and infused water tomorrow.");
  }

  if (sodiumStatus === "SAFE") {
    positiveHabits.push("Great sodium balance—your heart and kidneys appreciate the mindful seasoning!");
  } else {
    improvementAreas.push("Sodium was higher today. Try pairing meals with potassium-rich greens and extra water.");
  }

  if (mealCount >= 3) {
    positiveHabits.push("Consistent visual food diary tracking throughout the day!");
  }

  let squirrelTip = "SQUI says: Consistency over perfection! Every mindful choice builds your long-term vitality.";
  if (sodiumStatus === "EXCEEDED") {
    squirrelTip = "SQUI says: A little salty today? Balance it naturally tomorrow with a tall glass of water and fresh cucumbers!";
  } else if (sugarStatus === "EXCEEDED") {
    squirrelTip = "SQUI says: Craving sweets? A small handful of berries or crisp apple slices makes a wonderful squirrel-approved snack!";
  }

  return { positiveHabits, improvementAreas, squirrelTip };
};

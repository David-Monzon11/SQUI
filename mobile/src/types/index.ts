export type MealCategory = 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK' | 'DRINK';

export type StatusLevel = 'SAFE' | 'CAUTION' | 'EXCEEDED';

export interface NutritionInfo {
  sugarG: number;
  sodiumMg: number;
  caloriesKcal: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  fiberG?: number;
}

export interface MealItem {
  id: string;
  mealCategory: MealCategory;
  mealTime: string;
  foodName: string;
  description?: string;
  portionSize: string;
  imageUrl?: string;
  notes?: string;
  nutrition: NutritionInfo;
}

export interface DailySummary {
  date: string;
  totalSugarG: number;
  totalSodiumMg: number;
  totalCaloriesKcal: number;
  waterIntakeMl: number;
  weightKg?: number;
  mealCount: number;
  sugarStatus: StatusLevel;
  sodiumStatus: StatusLevel;
  healthScore: number;
  positiveHabits: string[];
  improvementAreas: string[];
  squirrelTip: string;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  targetDailySugarG: number;
  targetDailySodiumMg: number;
  targetDailyCaloriesKcal: number;
  targetDailyWaterMl: number;
  currentWeightKg?: number;
  targetWeightKg?: number;
}

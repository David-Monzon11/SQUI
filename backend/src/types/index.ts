export type MealCategory = 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK' | 'DRINK';

export type SugarStatus = 'SAFE' | 'CAUTION' | 'EXCEEDED';
export type SodiumStatus = 'SAFE' | 'CAUTION' | 'EXCEEDED';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  age?: number;
  gender?: string;
  heightCm?: number;
  currentWeightKg?: number;
  targetWeightKg?: number;
  activityLevel?: string;
  targetDailySugarG: number;
  targetDailySodiumMg: number;
  targetDailyCaloriesKcal: number;
  targetDailyWaterMl: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface NutritionValues {
  sugarG: number;
  sodiumMg: number;
  caloriesKcal: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  fiberG?: number;
}

export interface MealRecord {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD
  mealCategory: MealCategory;
  mealTime: string; // HH:mm
  foodName: string;
  description?: string;
  portionSize: string;
  imageUrl?: string;
  notes?: string;
  nutrition: NutritionValues;
  createdAt: Date;
  updatedAt: Date;
}

export interface WeightRecord {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD
  weightKg: number;
  bloodPressureSys?: number;
  bloodPressureDia?: number;
  bloodSugarMgDl?: number;
  mood?: string;
  notes?: string;
  createdAt: Date;
}

export interface DailySummaryData {
  date: string;
  totalSugarG: number;
  totalSodiumMg: number;
  totalCaloriesKcal: number;
  totalProteinG: number;
  totalCarbsG: number;
  totalFatG: number;
  totalFiberG: number;
  waterIntakeMl: number;
  weightKg?: number;
  mealCount: number;
  sugarStatus: SugarStatus;
  sodiumStatus: SodiumStatus;
  healthScore: number;
  positiveHabits: string[];
  improvementAreas: string[];
  squirrelTip: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    details?: any[];
  };
}

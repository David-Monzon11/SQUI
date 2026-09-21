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

export interface HourlyWeatherItem {
  time: string;
  temp: string;
  chance: string;
  iconType: 'rain' | 'sun' | 'cloud' | 'moon';
}

export interface DailyForecastItem {
  day: string;
  date: string;
  temp: string;
  chance: string;
  iconType: 'rain' | 'sun' | 'cloud' | 'moon';
}

export interface WeatherData {
  temperature: number;
  high: number;
  low: number;
  location: string;
  dateStr?: string;
  statusText: string;
  iconType: 'rain' | 'sun' | 'cloud' | 'moon';
  condition?: 'clear' | 'clouds' | 'rain' | 'heavyRain' | 'thunderstorm' | 'drizzle' | 'fog';
  sunrise?: number;
  sunset?: number;
  timezone?: number;
  humidity: number;
  hourly: HourlyWeatherItem[];
  dailyForecast?: DailyForecastItem[];
  hydratingTip?: string;
  dailySummaryText?: string;
}

export type WisdomCategory = 'SUGAR' | 'SODIUM' | 'HYDRATION' | 'MINDFULNESS';

export interface WisdomTip {
  id: string;
  category: WisdomCategory;
  title: string;
  content: string;
  actionItem: string;
  xpReward: number;
  icon: string;
}

export interface WisdomStreak {
  streakDays: number;
  todayXpEarned: number;
  totalXp: number;
  lastCompletedDate?: string;
}

// ─── Trend & Analytics ────────────────────────────────────────────────────────

export interface WeeklyTrend {
  /** ISO date string for the week starting day (Monday) */
  weekStartDate: string;
  avgSugarG: number;
  avgSodiumMg: number;
  avgCaloriesKcal: number;
  avgWaterMl: number;
  avgHealthScore: number;
  totalMealsLogged: number;
}

// ─── Notifications ────────────────────────────────────────────────────────────

export type NotificationType =
  | 'MEAL_REMINDER'
  | 'WEIGHT_REMINDER'
  | 'DAILY_SUMMARY'
  | 'SUGAR_ALERT'
  | 'SODIUM_ALERT'
  | 'HYDRATION_ALERT'
  | 'WISDOM_TIP';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
  /** Deep-link route to navigate to when tapped */
  deepLink?: string;
}

import { prisma } from "../config/db.js";
import { formatDateToKey } from "../utils/date.js";
import {
  evaluateSugarStatus,
  evaluateSodiumStatus,
  aggregateDailyNutrition,
} from "../engine/nutrition.engine.js";
import {
  calculateDailyHealthScore,
  generateSquirrelReflection,
} from "../engine/score.engine.js";

export class SummaryService {
  async getDailySummary(userId: string, date: string) {
    const targetDate = date || formatDateToKey();

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    const targetSugar = user?.targetDailySugarG || 25;
    const targetSodium = user?.targetDailySodiumMg || 2000;
    const targetWater = user?.targetDailyWaterMl || 2500;

    // Fetch all meals for the day
    const meals = await prisma.meal.findMany({
      where: { userId, date: targetDate },
      include: { nutrition: true },
    });

    // Fetch daily health log (weight, water)
    const dailyLog = await prisma.dailyHealthLog.findUnique({
      where: { userId_date: { userId, date: targetDate } },
    });

    const nutritionDataList = meals
      .filter((m) => m.nutrition !== null)
      .map((m) => ({ nutrition: m.nutrition! }));

    const totals = aggregateDailyNutrition(nutritionDataList);
    const waterIntakeMl = dailyLog?.waterIntakeMl || 0;
    const weightKg = dailyLog?.weightKg || user?.currentWeightKg || undefined;

    const sugarStatus = evaluateSugarStatus(totals.totalSugarG, targetSugar);
    const sodiumStatus = evaluateSodiumStatus(totals.totalSodiumMg, targetSodium);

    const healthScore = calculateDailyHealthScore({
      waterIntakeMl,
      targetWaterMl: targetWater,
      sugarStatus,
      sodiumStatus,
      mealCount: meals.length,
    });

    const { positiveHabits, improvementAreas, squirrelTip } =
      generateSquirrelReflection(sugarStatus, sodiumStatus, waterIntakeMl, meals.length);

    // Upsert the daily summary in database
    const summary = await prisma.dailySummary.upsert({
      where: { userId_date: { userId, date: targetDate } },
      create: {
        userId,
        date: targetDate,
        totalSugarG: totals.totalSugarG,
        totalSodiumMg: totals.totalSodiumMg,
        totalCaloriesKcal: totals.totalCaloriesKcal,
        totalProteinG: totals.totalProteinG,
        totalCarbsG: totals.totalCarbsG,
        totalFatG: totals.totalFatG,
        totalFiberG: totals.totalFiberG,
        waterIntakeMl,
        mealCount: meals.length,
        sugarStatus,
        sodiumStatus,
        healthScore,
        positiveHabits: JSON.stringify(positiveHabits),
        improvementAreas: JSON.stringify(improvementAreas),
        squirrelTip,
      },
      update: {
        totalSugarG: totals.totalSugarG,
        totalSodiumMg: totals.totalSodiumMg,
        totalCaloriesKcal: totals.totalCaloriesKcal,
        totalProteinG: totals.totalProteinG,
        totalCarbsG: totals.totalCarbsG,
        totalFatG: totals.totalFatG,
        totalFiberG: totals.totalFiberG,
        waterIntakeMl,
        mealCount: meals.length,
        sugarStatus,
        sodiumStatus,
        healthScore,
        positiveHabits: JSON.stringify(positiveHabits),
        improvementAreas: JSON.stringify(improvementAreas),
        squirrelTip,
      },
    });

    return {
      date: targetDate,
      totals,
      waterIntakeMl,
      weightKg,
      mealCount: meals.length,
      sugarStatus,
      sodiumStatus,
      healthScore,
      positiveHabits,
      improvementAreas,
      squirrelTip,
      summaryId: summary.id,
    };
  }

  async getWeeklyProgress(userId: string) {
    const today = new Date();
    const dates: string[] = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setUTCDate(today.getUTCDate() - i);
      dates.push(formatDateToKey(d));
    }

    const summaries = await prisma.dailySummary.findMany({
      where: {
        userId,
        date: { in: dates },
      },
    });

    const weightLogs = await prisma.dailyHealthLog.findMany({
      where: {
        userId,
        date: { in: dates },
      },
    });

    const mapSummary = new Map(summaries.map((s) => [s.date, s]));
    const mapWeight = new Map(weightLogs.map((w) => [w.date, w.weightKg]));

    const dayByDay = dates.map((date) => {
      const s = mapSummary.get(date);
      return {
        date,
        totalSugarG: s?.totalSugarG || 0,
        totalSodiumMg: s?.totalSodiumMg || 0,
        totalCaloriesKcal: s?.totalCaloriesKcal || 0,
        healthScore: s?.healthScore || 0,
        waterIntakeMl: s?.waterIntakeMl || 0,
        weightKg: mapWeight.get(date) || null,
      };
    });

    const totalScore = dayByDay.reduce((acc, curr) => acc + curr.healthScore, 0);
    const avgScore = Math.round(totalScore / (dayByDay.filter((d) => d.healthScore > 0).length || 1));

    return {
      weekDates: dates,
      dayByDay,
      averageHealthScore: avgScore,
      streakDays: dayByDay.filter((d) => d.healthScore >= 70).length,
    };
  }
}

export const summaryService = new SummaryService();

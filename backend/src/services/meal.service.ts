import { prisma } from "../config/db.js";
import { storageService } from "../storage/storage.service.js";
import { formatDateToKey } from "../utils/date.js";
import { calculateCalories } from "../engine/nutrition.engine.js";
import { NUTRITION_TARGETS } from "../config/constants.js";
import { MealCategory } from "../types/index.js";

export interface CreateMealInput {
  date?: string;
  mealCategory: MealCategory;
  mealTime?: string;
  foodName: string;
  description?: string;
  portionSize?: string;
  notes?: string;
  sugarG?: number;
  sodiumMg?: number;
  caloriesKcal?: number;
  proteinG?: number;
  carbsG?: number;
  fatG?: number;
  fiberG?: number;
}

export class MealService {
  async createMeal(
    userId: string,
    input: CreateMealInput,
    file?: Express.Multer.File
  ) {
    const targetDate = input.date || formatDateToKey();
    const now = new Date();
    const mealTime =
      input.mealTime ||
      `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    let imageUrl: string | undefined = undefined;
    if (file) {
      const ext = file.originalname.split(".").pop() || "jpg";
      const fileName = `meal_${userId}_${Date.now()}.${ext}`;
      imageUrl = await storageService.uploadFile(file.buffer, fileName, file.mimetype);
    }

    const proteinG = input.proteinG || 0;
    const carbsG = input.carbsG || 0;
    const fatG = input.fatG || 0;
    const caloriesKcal =
      input.caloriesKcal && input.caloriesKcal > 0
        ? input.caloriesKcal
        : calculateCalories(proteinG, carbsG, fatG);

    const sugarG = input.sugarG || 0;
    const sodiumMg = input.sodiumMg || 0;
    const fiberG = input.fiberG || 0;

    const isHighSodium = sodiumMg >= NUTRITION_TARGETS.MEAL_HIGH_SODIUM_WARNING_MG;

    const meal = await prisma.meal.create({
      data: {
        userId,
        date: targetDate,
        mealCategory: input.mealCategory,
        mealTime,
        foodName: input.foodName,
        description: input.description,
        portionSize: input.portionSize || "1 serving",
        imageUrl,
        notes: input.notes,
        nutrition: {
          create: {
            sugarG,
            sodiumMg,
            caloriesKcal,
            proteinG,
            carbsG,
            fatG,
            fiberG,
          },
        },
      },
      include: {
        nutrition: true,
      },
    });

    return {
      meal,
      warning: isHighSodium
        ? `Sodium alert: This meal has ${sodiumMg}mg sodium (exceeds single-meal recommendation of 800mg). SQUI suggests balancing with extra hydration today!`
        : null,
    };
  }

  async getMealsByDate(userId: string, date: string) {
    const targetDate = date || formatDateToKey();

    const meals = await prisma.meal.findMany({
      where: {
        userId,
        date: targetDate,
      },
      include: {
        nutrition: true,
      },
      orderBy: { mealTime: "asc" },
    });

    // Group meals by category
    const grouped: Record<MealCategory, typeof meals> = {
      BREAKFAST: [],
      LUNCH: [],
      DINNER: [],
      SNACK: [],
      DRINK: [],
    };

    meals.forEach((m) => {
      const cat = m.mealCategory as MealCategory;
      if (grouped[cat]) {
        grouped[cat].push(m);
      }
    });

    return {
      date: targetDate,
      totalMeals: meals.length,
      grouped,
      meals,
    };
  }

  async deleteMeal(userId: string, mealId: string) {
    const meal = await prisma.meal.findFirst({
      where: { id: mealId, userId },
    });

    if (!meal) {
      throw { statusCode: 404, code: "MEAL_NOT_FOUND", message: "Meal not found" };
    }

    if (meal.imageUrl) {
      await storageService.deleteFile(meal.imageUrl).catch(() => {});
    }

    await prisma.meal.delete({
      where: { id: mealId },
    });

    return { success: true };
  }
}

export const mealService = new MealService();

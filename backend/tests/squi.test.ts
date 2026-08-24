import assert from "assert";
import {
  calculateCalories,
  evaluateSugarStatus,
  evaluateSodiumStatus,
  aggregateDailyNutrition,
} from "../src/engine/nutrition.engine.js";
import {
  calculateDailyHealthScore,
  generateSquirrelReflection,
} from "../src/engine/score.engine.js";
import { authService } from "../src/services/auth.service.js";
import { weightService } from "../src/services/weight.service.js";
import { mealService } from "../src/services/meal.service.js";
import { summaryService } from "../src/services/summary.service.js";
import { knowledgeService } from "../src/services/knowledge.service.js";
import { prisma } from "../src/config/db.js";

async function runTests() {
  console.log("🐿️ Starting SQUI Test Suite...\n");

  // ================= 1. NUTRITION ENGINE TESTS =================
  console.log("[Test 1] Nutrition Engine - Calorie Calculations");
  const calories = calculateCalories(20, 30, 10); // 20*4 + 30*4 + 10*9 = 80 + 120 + 90 = 290
  assert.strictEqual(calories, 290, "Calorie calculation should be 290 kcal");
  console.log("  ✅ Calorie formula passed (290 kcal)");

  console.log("[Test 2] Nutrition Engine - Sugar Thresholds");
  assert.strictEqual(evaluateSugarStatus(10, 25), "SAFE", "10g / 25g is SAFE (<70%)");
  assert.strictEqual(evaluateSugarStatus(20, 25), "CAUTION", "20g / 25g is CAUTION (70-100%)");
  assert.strictEqual(evaluateSugarStatus(30, 25), "EXCEEDED", "30g / 25g is EXCEEDED (>100%)");
  console.log("  ✅ Sugar status thresholds (SAFE, CAUTION, EXCEEDED) passed");

  console.log("[Test 3] Nutrition Engine - Sodium Thresholds");
  assert.strictEqual(evaluateSodiumStatus(1200, 2000), "SAFE", "1200mg / 2000mg is SAFE (<70%)");
  assert.strictEqual(evaluateSodiumStatus(1800, 2000), "CAUTION", "1800mg / 2000mg is CAUTION");
  assert.strictEqual(evaluateSodiumStatus(2500, 2000), "EXCEEDED", "2500mg / 2000mg is EXCEEDED");
  console.log("  ✅ Sodium status thresholds passed");

  console.log("[Test 4] Nutrition Engine - Daily Meal Aggregations");
  const sampleMeals = [
    {
      nutrition: {
        sugarG: 5,
        sodiumMg: 350,
        caloriesKcal: 400,
        proteinG: 25,
        carbsG: 40,
        fatG: 12,
        fiberG: 6,
      },
    },
    {
      nutrition: {
        sugarG: 12,
        sodiumMg: 450,
        caloriesKcal: 550,
        proteinG: 30,
        carbsG: 60,
        fatG: 15,
        fiberG: 4,
      },
    },
  ];
  const totals = aggregateDailyNutrition(sampleMeals);
  assert.strictEqual(totals.totalSugarG, 17, "Total sugar should be 17g");
  assert.strictEqual(totals.totalSodiumMg, 800, "Total sodium should be 800mg");
  assert.strictEqual(totals.totalCaloriesKcal, 950, "Total calories should be 950 kcal");
  console.log("  ✅ Aggregation calculations passed");

  // ================= 2. HEALTH SCORE & MASCOT REFLECTION =================
  console.log("[Test 5] Score Engine - Daily Health Score & Mascot Reflections");
  const perfectScore = calculateDailyHealthScore({
    waterIntakeMl: 2500,
    targetWaterMl: 2500,
    sugarStatus: "SAFE",
    sodiumStatus: "SAFE",
    mealCount: 3,
  });
  assert.strictEqual(perfectScore, 100, "Optimal compliance should yield 100 score");

  const reflection = generateSquirrelReflection("SAFE", "CAUTION", 2000, 3);
  assert.ok(reflection.positiveHabits.length > 0, "Should generate positive highlights");
  assert.ok(reflection.squirrelTip.includes("SQUI says"), "Should include SQUI mascot advice");
  console.log("  ✅ Health score (100/100) and SQUI mascot reflection passed");

  // ================= 3. DATABASE & SERVICE INTEGRATION =================
  console.log("[Test 6] Integration - Auth Registration & Login");
  const testEmail = `squirrel_${Date.now()}@squi.app`;
  const registerResult = await authService.register({
    email: testEmail,
    password: "Password123!",
    fullName: "Alex Rivera",
    currentWeightKg: 68.5,
    targetWeightKg: 65.0,
  });
  assert.ok(registerResult.token, "Should return JWT token");
  assert.strictEqual(registerResult.user.email, testEmail);

  const loginResult = await authService.login(testEmail, "Password123!");
  assert.ok(loginResult.token, "Login should return JWT token");
  console.log("  ✅ Auth registration and login passed");

  const userId = registerResult.user.id;

  console.log("[Test 7] Integration - Weight Tracking");
  const weightLog = await weightService.logDailyWeight(userId, {
    date: "2026-08-21",
    weightKg: 68.2,
    mood: "Energized",
    notes: "Morning weigh-in after glass of water",
  });
  assert.strictEqual(weightLog.weightKg, 68.2);

  await weightService.updateWaterIntake(userId, "2026-08-21", 500);
  const updatedDaily = await weightService.getDailyLog(userId, "2026-08-21");
  assert.strictEqual(updatedDaily?.waterIntakeMl, 500);
  console.log("  ✅ Daily weight and water logging passed");

  console.log("[Test 8] Integration - Meal Logging & Food Diary");
  const meal1 = await mealService.createMeal(userId, {
    date: "2026-08-21",
    mealCategory: "BREAKFAST",
    mealTime: "08:30",
    foodName: "Oatmeal with Fresh Blueberries & Almonds",
    portionSize: "1 bowl",
    sugarG: 8,
    sodiumMg: 150,
    proteinG: 12,
    carbsG: 45,
    fatG: 8,
  });
  assert.strictEqual(meal1.meal.foodName, "Oatmeal with Fresh Blueberries & Almonds");

  const highSodiumMeal = await mealService.createMeal(userId, {
    date: "2026-08-21",
    mealCategory: "LUNCH",
    mealTime: "12:45",
    foodName: "Savory Teriyaki Chicken Rice Bowl",
    portionSize: "1 plate",
    sugarG: 10,
    sodiumMg: 950, // Trigger high sodium warning
    proteinG: 35,
    carbsG: 55,
    fatG: 14,
  });
  assert.ok(highSodiumMeal.warning, "Should trigger sodium warning (>800mg)");
  console.log("  ✅ Meal logging and high-sodium warning passed");

  console.log("[Test 9] Integration - Daily Summary & Weekly Progress");
  const summary = await summaryService.getDailySummary(userId, "2026-08-21");
  assert.strictEqual(summary.mealCount, 2);
  assert.strictEqual(summary.totals.totalSugarG, 18);
  assert.strictEqual(summary.totals.totalSodiumMg, 1100);
  assert.ok(summary.healthScore > 0);

  const weekly = await summaryService.getWeeklyProgress(userId);
  assert.strictEqual(weekly.weekDates.length, 7);
  console.log("  ✅ Daily summary aggregation and weekly progress passed");

  console.log("[Test 10] Integration - Knowledge Base Articles");
  const articles = await knowledgeService.getArticles();
  assert.ok(articles.length >= 5, "Knowledge base should have educational articles");
  console.log("  ✅ Knowledge base retrieval passed");

  console.log("\n🎉 ALL 10 TESTS PASSED SUCCESSFULLY! 🐿️✨");

  await prisma.$disconnect();
}

runTests().catch((err) => {
  console.error("❌ Test failed with error:", err);
  process.exit(1);
});

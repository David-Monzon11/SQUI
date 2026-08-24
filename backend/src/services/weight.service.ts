import { prisma } from "../config/db.js";
import { formatDateToKey } from "../utils/date.js";

export interface LogWeightInput {
  date?: string; // YYYY-MM-DD
  weightKg: number;
  bloodPressureSys?: number;
  bloodPressureDia?: number;
  bloodSugarMgDl?: number;
  mood?: string;
  notes?: string;
}

export class WeightService {
  async logDailyWeight(userId: string, input: LogWeightInput) {
    const targetDate = input.date || formatDateToKey();

    const existingLog = await prisma.dailyHealthLog.findUnique({
      where: {
        userId_date: {
          userId,
          date: targetDate,
        },
      },
    });

    if (existingLog) {
      // Update existing daily log with weight and metrics
      const updated = await prisma.dailyHealthLog.update({
        where: { id: existingLog.id },
        data: {
          weightKg: input.weightKg,
          bloodPressureSys: input.bloodPressureSys ?? existingLog.bloodPressureSys,
          bloodPressureDia: input.bloodPressureDia ?? existingLog.bloodPressureDia,
          bloodSugarMgDl: input.bloodSugarMgDl ?? existingLog.bloodSugarMgDl,
          mood: input.mood ?? existingLog.mood,
          notes: input.notes ?? existingLog.notes,
        },
      });

      // Also update user's current weight in profile
      await prisma.user.update({
        where: { id: userId },
        data: { currentWeightKg: input.weightKg },
      });

      return updated;
    }

    // Create new daily health log
    const created = await prisma.dailyHealthLog.create({
      data: {
        userId,
        date: targetDate,
        weightKg: input.weightKg,
        bloodPressureSys: input.bloodPressureSys,
        bloodPressureDia: input.bloodPressureDia,
        bloodSugarMgDl: input.bloodSugarMgDl,
        mood: input.mood,
        notes: input.notes,
      },
    });

    // Update current weight in profile
    await prisma.user.update({
      where: { id: userId },
      data: { currentWeightKg: input.weightKg },
    });

    return created;
  }

  async getWeightHistory(userId: string, days = 30) {
    const logs = await prisma.dailyHealthLog.findMany({
      where: {
        userId,
        weightKg: { not: null },
      },
      orderBy: { date: "desc" },
      take: days,
    });

    return logs.reverse(); // Return in chronological order
  }

  async updateWaterIntake(userId: string, date: string, incrementMl: number) {
    const targetDate = date || formatDateToKey();

    const existing = await prisma.dailyHealthLog.findUnique({
      where: { userId_date: { userId, date: targetDate } },
    });

    if (existing) {
      const newWater = Math.max(0, existing.waterIntakeMl + incrementMl);
      return prisma.dailyHealthLog.update({
        where: { id: existing.id },
        data: { waterIntakeMl: newWater },
      });
    }

    return prisma.dailyHealthLog.create({
      data: {
        userId,
        date: targetDate,
        waterIntakeMl: Math.max(0, incrementMl),
      },
    });
  }

  async getDailyLog(userId: string, date: string) {
    const targetDate = date || formatDateToKey();
    return prisma.dailyHealthLog.findUnique({
      where: { userId_date: { userId, date: targetDate } },
    });
  }
}

export const weightService = new WeightService();

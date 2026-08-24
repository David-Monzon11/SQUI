import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";
import { config } from "../config/env.js";
import { RegisterInput } from "../validations/auth.validation.js";

export class AuthService {
  async register(input: RegisterInput) {
    const existing = await prisma.user.findUnique({
      where: { email: input.email.toLowerCase() },
    });

    if (existing) {
      throw {
        statusCode: 409,
        code: "AUTH_EMAIL_EXISTS",
        message: "An account with this email address already exists",
      };
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(input.password, salt);

    const user = await prisma.user.create({
      data: {
        email: input.email.toLowerCase(),
        passwordHash,
        fullName: input.fullName,
        age: input.age,
        gender: input.gender,
        heightCm: input.heightCm,
        currentWeightKg: input.currentWeightKg,
        targetWeightKg: input.targetWeightKg,
      },
    });

    const token = this.generateToken(user.id, user.email);
    return { user: this.sanitizeUser(user), token };
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      throw {
        statusCode: 401,
        code: "AUTH_INVALID_CREDENTIALS",
        message: "Invalid email or password",
      };
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      throw {
        statusCode: 401,
        code: "AUTH_INVALID_CREDENTIALS",
        message: "Invalid email or password",
      };
    }

    const token = this.generateToken(user.id, user.email);
    return { user: this.sanitizeUser(user), token };
  }

  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw {
        statusCode: 404,
        code: "USER_NOT_FOUND",
        message: "User profile not found",
      };
    }

    return this.sanitizeUser(user);
  }

  async updateProfile(userId: string, data: Partial<RegisterInput> & {
    targetDailySugarG?: number;
    targetDailySodiumMg?: number;
    targetDailyCaloriesKcal?: number;
    targetDailyWaterMl?: number;
  }) {
    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        fullName: data.fullName,
        age: data.age,
        gender: data.gender,
        heightCm: data.heightCm,
        currentWeightKg: data.currentWeightKg,
        targetWeightKg: data.targetWeightKg,
        targetDailySugarG: data.targetDailySugarG,
        targetDailySodiumMg: data.targetDailySodiumMg,
        targetDailyCaloriesKcal: data.targetDailyCaloriesKcal,
        targetDailyWaterMl: data.targetDailyWaterMl,
      },
    });

    return this.sanitizeUser(updated);
  }

  generateToken(userId: string, email: string): string {
    return jwt.sign({ userId, email }, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn as any,
    });
  }

  private sanitizeUser(user: any) {
    const { passwordHash, ...sanitized } = user;
    return sanitized;
  }
}

export const authService = new AuthService();

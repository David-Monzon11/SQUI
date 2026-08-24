import express from "express";
import {
  logDailyWeight,
  getWeightHistory,
  updateWaterIntake,
  getDailyLog,
} from "../controllers/weight.controller.js";
import { authenticateJwt } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authenticateJwt);

router.post("/", logDailyWeight);
router.get("/history", getWeightHistory);
router.post("/water", updateWaterIntake);
router.get("/daily", getDailyLog);

export { router as weightRouter };

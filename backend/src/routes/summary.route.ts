import express from "express";
import { getDailySummary, getWeeklyProgress } from "../controllers/summary.controller.js";
import { authenticateJwt } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(authenticateJwt);

router.get("/daily", getDailySummary);
router.get("/weekly", getWeeklyProgress);

export { router as summaryRouter };

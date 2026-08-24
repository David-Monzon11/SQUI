import express from "express";
import { createMeal, getMealsByDate, deleteMeal } from "../controllers/meal.controller.js";
import { authenticateJwt } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.use(authenticateJwt);

router.post("/", upload.single("photo"), createMeal);
router.get("/", getMealsByDate);
router.delete("/:id", deleteMeal);

export { router as mealRouter };

import express from "express";
import cors from "cors";
import path from "path";
import { config } from "./config/env.js";
import loggerMiddleware from "./middleware/logger.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { authRouter } from "./routes/auth.route.js";
import { weightRouter } from "./routes/weight.route.js";
import { mealRouter } from "./routes/meal.route.js";
import { summaryRouter } from "./routes/summary.route.js";
import { knowledgeRouter } from "./routes/knowledge.route.js";
import { Router as healthRouter } from "./routes/health.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

// Serve uploaded meal photos statically in development
const uploadDir = path.resolve(process.cwd(), config.storageLocalPath);
app.use("/uploads", express.static(uploadDir));

// API Routes
app.use("/health", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/weights", weightRouter);
app.use("/api/meals", mealRouter);
app.use("/api/summary", summaryRouter);
app.use("/api/knowledge", knowledgeRouter);

// Centralized error handler
app.use(errorHandler);

const port = config.port;
app.listen(port, () => {
  console.log(`[SQUI API] Server running on http://localhost:${port}`);
});

export default app;
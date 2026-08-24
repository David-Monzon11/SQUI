import express from "express";
import { getArticles, getArticleById } from "../controllers/knowledge.controller.js";

const router = express.Router();

router.get("/", getArticles);
router.get("/:id", getArticleById);

export { router as knowledgeRouter };

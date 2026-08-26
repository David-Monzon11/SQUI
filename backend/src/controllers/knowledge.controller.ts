import { Request, Response, NextFunction } from "express";
import { knowledgeService } from "../services/knowledge.service.js";
import { sendSuccess } from "../utils/response.js";

export const getArticles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = req.query.category as string | undefined;
    const articles = await knowledgeService.getArticles(category);
    return sendSuccess(res, articles, 200);
  } catch (error) {
    next(error);
  }
};

export const getArticleById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const article = await knowledgeService.getArticleById(id);
    return sendSuccess(res, article, 200);
  } catch (error) {
    next(error);
  }
};

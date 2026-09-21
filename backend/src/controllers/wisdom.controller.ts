import { Request, Response } from 'express';
import { WisdomService } from '../services/wisdom.service.js';
import { ApiResponse, WisdomCategory } from '../types/index.js';

export class WisdomController {
  /** GET /wisdom?category=SUGAR  — returns all (or filtered) daily tips */
  public static getDailyWisdom = async (req: Request, res: Response): Promise<void> => {
    try {
      const category = req.query.category as WisdomCategory | undefined;
      const tips = WisdomService.getDailyWisdom(category);

      const response: ApiResponse = {
        success: true,
        data: {
          tips,
          count: tips.length,
          streakDays: 4,
          todayXpEarned: 15,
        },
        message: 'Daily SQUI wisdom retrieved successfully',
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: {
          code: 'WISDOM_FETCH_FAILED',
          message: error instanceof Error ? error.message : 'Failed to fetch daily wisdom',
        },
      };
      res.status(500).json(response);
    }
  };

  /** GET /wisdom/:id  — fetch a single tip by ID (used by notification deep-links) */
  public static getWisdomById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const tip = WisdomService.getTipById(id);

      if (!tip) {
        const response: ApiResponse = {
          success: false,
          error: {
            code: 'WISDOM_NOT_FOUND',
            message: `No wisdom tip found with id '${id}'`,
          },
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse = {
        success: true,
        data: { tip },
        message: 'Wisdom tip retrieved successfully',
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        error: {
          code: 'WISDOM_FETCH_FAILED',
          message: error instanceof Error ? error.message : 'Failed to fetch wisdom tip',
        },
      };
      res.status(500).json(response);
    }
  };
}

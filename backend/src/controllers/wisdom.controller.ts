import { Request, Response } from 'express';
import { WisdomService } from '../services/wisdom.service';
import { ApiResponse, WisdomCategory } from '../types';

export class WisdomController {
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
}

import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/server';
import { WisdomService } from '../src/services/wisdom.service';

describe('Wisdom Engine & API Endpoints', () => {
  it('should return all daily wisdom tips from service', () => {
    const tips = WisdomService.getDailyWisdom();
    expect(tips).toBeInstanceOf(Array);
    expect(tips.length).toBeGreaterThanOrEqual(4);
    expect(tips[0]).toHaveProperty('title');
    expect(tips[0]).toHaveProperty('category');
    expect(tips[0]).toHaveProperty('actionItem');
  });

  it('should filter wisdom tips by category', () => {
    const sugarTips = WisdomService.getDailyWisdom('SUGAR');
    expect(sugarTips.length).toBeGreaterThan(0);
    sugarTips.forEach((t) => expect(t.category).toBe('SUGAR'));
  });

  it('GET /api/wisdom/daily should return 200 with structured wisdom list', async () => {
    const res = await request(app).get('/api/wisdom/daily');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.tips).toBeInstanceOf(Array);
    expect(res.body.data.streakDays).toBeGreaterThan(0);
  });
});

import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/server';
import { WisdomService } from '../src/services/wisdom.service';
import { WisdomCategory } from '../src/types';

describe('Wisdom Engine & API Endpoints', () => {
  it('should return all daily wisdom tips from service', () => {
    const tips = WisdomService.getDailyWisdom();
    expect(tips).toBeInstanceOf(Array);
    expect(tips.length).toBeGreaterThanOrEqual(4);
    expect(tips[0]).toHaveProperty('title');
    expect(tips[0]).toHaveProperty('category');
    expect(tips[0]).toHaveProperty('actionItem');
  });

  it('should support and filter wisdom tips for all 4 categories', () => {
    const categories: WisdomCategory[] = ['SUGAR', 'SODIUM', 'HYDRATION', 'MINDFULNESS'];
    
    categories.forEach((cat) => {
      const tips = WisdomService.getDailyWisdom(cat);
      expect(tips.length).toBeGreaterThan(0);
      tips.forEach((t) => expect(t.category).toBe(cat));
    });
  });

  it('GET /api/wisdom/daily should return 200 with structured wisdom list', async () => {
    const res = await request(app).get('/api/wisdom/daily');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.tips).toBeInstanceOf(Array);
    expect(res.body.data.streakDays).toBeGreaterThan(0);
  });

  it('GET /api/wisdom/daily?category=HYDRATION should return filtered tips for category', async () => {
    const res = await request(app).get('/api/wisdom/daily?category=HYDRATION');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.tips).toBeInstanceOf(Array);
    res.body.data.tips.forEach((tip: any) => {
      expect(tip.category).toBe('HYDRATION');
    });
  });
});

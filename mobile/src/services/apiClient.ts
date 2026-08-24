import { API_CONFIG } from '../constants/config';
import { DailySummary, MealItem, UserProfile } from '../types';

class ApiClient {
  private baseUrl = API_CONFIG.BASE_URL;
  private token: string | null = null;

  setToken(token: string | null) {
    this.token = token;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error?.message || 'Network request failed');
      }
      return json.data as T;
    } catch (error: any) {
      console.warn(`[ApiClient] Error at ${endpoint}:`, error.message);
      throw error;
    }
  }

  // Auth endpoints
  async register(data: any) {
    return this.request<{ user: UserProfile; token: string }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: { email: string; password: string }) {
    return this.request<{ user: UserProfile; token: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getProfile() {
    return this.request<UserProfile>('/api/auth/profile');
  }

  // Weight & Daily Log endpoints
  async logWeight(data: { weightKg: number; date?: string; mood?: string; notes?: string }) {
    return this.request('/api/weights', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateWater(incrementMl: number, date?: string) {
    return this.request('/api/weights/water', {
      method: 'POST',
      body: JSON.stringify({ incrementMl, date }),
    });
  }

  async getWeightHistory(days = 30) {
    return this.request<any[]>(`/api/weights/history?days=${days}`);
  }

  // Meals endpoints
  async logMeal(mealData: any) {
    return this.request<{ meal: MealItem; warning?: string }>('/api/meals', {
      method: 'POST',
      body: JSON.stringify(mealData),
    });
  }

  async getMeals(date?: string) {
    const query = date ? `?date=${date}` : '';
    return this.request<{ date: string; totalMeals: number; grouped: Record<string, MealItem[]>; meals: MealItem[] }>(
      `/api/meals${query}`
    );
  }

  // Summary & Knowledge endpoints
  async getDailySummary(date?: string) {
    const query = date ? `?date=${date}` : '';
    return this.request<DailySummary>(`/api/summary/daily${query}`);
  }

  async getWeeklyProgress() {
    return this.request<any>('/api/summary/weekly');
  }

  async getKnowledgeArticles(category?: string) {
    const query = category ? `?category=${category}` : '';
    return this.request<any[]>(`/api/knowledge${query}`);
  }
}

export const apiClient = new ApiClient();

import { Platform } from 'react-native';

const DEV_API_URL = Platform.select({
  web: 'http://localhost:3000',
  default: 'http://192.168.0.244:3000',
});

export const API_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_API_URL || DEV_API_URL,
  TIMEOUT_MS: 10000,
};

export const DEFAULT_TARGETS = {
  DAILY_SUGAR_G: 25,
  DAILY_SODIUM_MG: 2000,
  DAILY_WATER_ML: 2500,
  DAILY_CALORIES_KCAL: 2000,
};

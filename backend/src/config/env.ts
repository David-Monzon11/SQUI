export const config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'squi_default_dev_secret',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'squi_default_refresh_secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  storageType: (process.env.STORAGE_TYPE || 'local') as 'local' | 's3' | 'r2',
  storageLocalPath: process.env.STORAGE_LOCAL_PATH || './uploads',
};

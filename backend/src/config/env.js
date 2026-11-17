import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const env = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tanora_hotels',
  JWT_SECRET: process.env.JWT_SECRET || 'tanora_super_secret_jwt_key_2026',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'tanora_super_secret_refresh_jwt_key_2026',
  JWT_EXPIRES_IN: '1d',
  JWT_REFRESH_EXPIRES_IN: '7d',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  COOKIE_SECRET: process.env.COOKIE_SECRET || 'tanora_cookie_secret_key_2026',
  INITIAL_ADMIN_EMAIL: process.env.INITIAL_ADMIN_EMAIL || 'admin@tanorahotels.com',
  INITIAL_ADMIN_PASSWORD: process.env.INITIAL_ADMIN_PASSWORD || 'xHotel_Tanora@123x',
  INITIAL_ADMIN_NAME: process.env.INITIAL_ADMIN_NAME || 'Tanora Administrator',
};

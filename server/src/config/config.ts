import { config } from "dotenv";

config();

export const JWT_SECRET_ACCESS_TOKEN = process.env.JWT_SECRET_ACCESS_TOKEN || "secret";
export const JWT_SECRET_REFRESH_TOKEN = process.env.JWT_SECRET_REFRESH_TOKEN || "secret";
export const DOMAIN = process.env.DOMAIN || "http://localhost:3000";
export const REDIS_URI = process.env.REDIS_URI || "redis://localhost:6379";
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
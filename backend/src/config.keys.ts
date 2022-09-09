import dotenv from "dotenv"
dotenv.config();

export const ENVIRONMENT= process.env.NODE_ENV || "development"
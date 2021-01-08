import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

export const SERVER_PORT = process.env.APP_PORT ? process.env.APP_PORT : 3000;
export const JWT_SECRET = process.env.JWT_KEY ? process.env.JWT_KEY : "";
export const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING
  ? process.env.DB_CONNECTION_STRING
  : "";

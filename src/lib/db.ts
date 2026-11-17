
import { neon } from "@neondatabase/serverless";

// Read the database connection string securely
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is missing from .env.local");
}

// Create Neon database connection
export const sql = neon(databaseUrl);

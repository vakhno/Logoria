import { config as loadEnv } from "dotenv";
import { defineConfig } from "drizzle-kit";

const env = loadEnv({ path: process.env.ENV_FILE || ".env.local" }).parsed ?? {};
const databaseUrl =
  process.env.DATABASE_URL ??
  env.DATABASE_URL ??
  "postgresql://postgres:postgres@localhost:5432/app_name";

export default defineConfig({
  schema: "./shared/db/src/schema.ts",
  out: "./shared/db/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});

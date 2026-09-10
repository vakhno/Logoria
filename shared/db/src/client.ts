import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

let pool: Pool | null = null;

export function getDatabaseUrl() {
  return process.env.DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5432/app_name";
}

export function getDb() {
  if (!pool) {
    pool = new Pool({ connectionString: getDatabaseUrl() });
  }
  return drizzle(pool);
}

export async function closeDb() {
  if (!pool) return;

  await pool.end();
  pool = null;
}

import { Controller, Get } from "@nestjs/common";
import { getDatabaseUrl } from "@shared/db";
import { Pool } from "pg";

@Controller()
export class AppController {
  @Get("health")
  health() {
    return { ok: true };
  }

  @Get("health/db")
  async db() {
    const pool = new Pool({ connectionString: getDatabaseUrl() });
    await pool.query("select 1");
    await pool.end();
    return { ok: true };
  }
}

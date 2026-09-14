import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/node-postgres";
import { describe, expect, it } from "vitest";
import { serverAuth } from "../../../auth/src/server/server-auth";
import { betterAuthSchema } from "../../../db/src/schema";

describe("Better Auth Drizzle schema compatibility", () => {
  it("accepts the schema when checking an unauthenticated session", async () => {
    const auth = serverAuth({
      database: drizzleAdapter(drizzle.mock(), {
        provider: "pg",
        schema: betterAuthSchema,
      }),
      baseURL: "http://localhost:3002",
      secret: "schema-integration-test-secret-32-characters",
      googleClientId: "integration-test-client-id",
      googleClientSecret: "integration-test-client-secret",
      trustedOrigins: ["http://localhost:3001"],
      useSecureCookies: false,
      cookieSameSite: "lax",
    });

    await expect(auth.api.getSession({ headers: new Headers() })).resolves.toBeNull();
  });
});

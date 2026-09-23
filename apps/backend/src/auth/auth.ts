import { drizzleAdapter, serverAuth, type AuthServer } from "@shared/auth/server";
import { getDb, betterAuthSchema } from "@shared/db";

function getPublicUrl(
  name: "API_PUBLIC_URL" | "APP_PUBLIC_URL" | "VITE_APP_PUBLIC_URL",
  fallback: string,
) {
  const value = process.env[name];

  if (!value) return fallback;

  try {
    return new URL(value).toString().replace(/\/$/, "");
  } catch {
    return fallback;
  }
}

function getTrustedOrigins() {
  return [
    getPublicUrl("APP_PUBLIC_URL", "http://localhost:3001"),
    getPublicUrl("VITE_APP_PUBLIC_URL", "http://localhost:3003"),
    getPublicUrl("API_PUBLIC_URL", "http://localhost:3002"),
    "http://localhost:3001",
    "http://localhost:3003",
    "https://localhost:3003",
    "http://localhost:3002",
  ].filter((value): value is string => Boolean(value));
}

export const auth: AuthServer = serverAuth({
  database: drizzleAdapter(getDb(), {
    provider: "pg",
    schema: betterAuthSchema,
  }),
  baseURL: getPublicUrl("API_PUBLIC_URL", "http://localhost:3002"),
  secret: process.env.BETTER_AUTH_SECRET as string,
  trustedOrigins: getTrustedOrigins(),
  googleClientId: process.env.GOOGLE_AUTH_CLIENT_ID as string,
  googleClientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET as string,
});

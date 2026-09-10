import { memoryAdapter, type MemoryDB } from "@better-auth/memory-adapter";
import { serverAuth, serverConfig, testUtils } from "../../../auth/src/server";

export const TEST_AUTH_PORT = 3301;
export const TEST_AUTH_URL = `http://127.0.0.1:${TEST_AUTH_PORT}`;

export const testMemoryDb: MemoryDB = {};

export function createAuthTestConfig() {
  return serverConfig({
    database: memoryAdapter(testMemoryDb),
    baseURL: TEST_AUTH_URL,
    secret: "test-secret-for-e2e-do-not-use-in-production",
    trustedOrigins: [TEST_AUTH_URL],
    rateLimit: {
      enabled: false,
    },
    plugins: [testUtils()],
    googleClientId: "fake-google-client-id",
    googleClientSecret: "fake-google-client-secret",
    useSecureCookies: false,
    cookieSameSite: "lax",
  });
}

export function createAuthTestServer() {
  return serverAuth({
    database: memoryAdapter(testMemoryDb),
    baseURL: TEST_AUTH_URL,
    secret: "test-secret-for-e2e-do-not-use-in-production",
    trustedOrigins: [TEST_AUTH_URL],
    rateLimit: {
      enabled: false,
    },
    plugins: [testUtils()],
    googleClientId: "fake-google-client-id",
    googleClientSecret: "fake-google-client-secret",
    useSecureCookies: false,
    cookieSameSite: "lax",
  });
}

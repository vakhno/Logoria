import { defineConfig } from "@playwright/test";

const TEST_AUTH_PORT = 3301;
const TEST_AUTH_URL = `http://127.0.0.1:${TEST_AUTH_PORT}`;

export default defineConfig({
  testDir: "./src/tests",
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "html",
  use: {
    baseURL: TEST_AUTH_URL,
    trace: "on-first-retry",
  },
  webServer: {
    command: "pnpm run test-server",
    url: `${TEST_AUTH_URL}/test/ok`,
    reuseExistingServer: !process.env.CI,
    timeout: process.env.CI ? 120_000 : 30_000,
  },
});

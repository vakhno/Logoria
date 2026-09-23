import assert from "node:assert/strict";
import { test } from "node:test";
import { callbackUrl } from "./callback-url.ts";

test("OAuth callback stays on the app origin", () => {
  const origin = "https://app.example.com";
  assert.equal(callbackUrl(origin, "/es/profile"), `${origin}/es/profile`);
  assert.equal(callbackUrl(origin, "//evil.example/profile"), origin);
  assert.equal(callbackUrl(origin, "/\\evil.example/profile"), origin);
  assert.equal(callbackUrl(origin, "https://evil.example/profile"), origin);
});

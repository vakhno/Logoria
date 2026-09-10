import { expect, test } from "@playwright/test";

type LoginResponse = {
  user: {
    id: string;
    email: string;
    name: string;
  };
  cookieHeader: string;
  token: string;
};

test.describe("Better Auth e2e test server", () => {
  test("reports health", async ({ request }) => {
    const response = await request.get("/test/ok");

    await expect(response).toBeOK();
    await expect(response.json()).resolves.toEqual({ ok: true });
  });

  test("returns no session without auth cookies", async ({ request }) => {
    const response = await request.get("/test/session");

    await expect(response).toBeOK();
    await expect(response.json()).resolves.toEqual({ session: null });
  });

  test("creates a user, issues cookies, and resolves the session", async ({ request }) => {
    const loginResponse = await request.post("/test/login", {
      data: {
        email: "app_name-e2e@example.com",
        name: "app_name E2E",
      },
    });
    const login = (await loginResponse.json()) as LoginResponse;

    await expect(loginResponse).toBeOK();
    expect(login.user.email).toBe("app_name-e2e@example.com");
    expect(login.cookieHeader).toContain("better-auth");
    expect(login.token).toEqual(expect.any(String));

    const sessionResponse = await request.get("/test/session", {
      headers: {
        cookie: login.cookieHeader,
      },
    });
    const body = await sessionResponse.json();

    await expect(sessionResponse).toBeOK();
    expect(body.session.user.email).toBe("app_name-e2e@example.com");
    expect(body.session.session.token).toBe(login.token);
  });
});

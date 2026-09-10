import { API_ROUTES, APP_ROUTES } from "../../../../routes/src";

describe("shared route constants", () => {
  it("defines stable app routes", () => {
    expect(APP_ROUTES.home).toBe("/");
    expect(APP_ROUTES.signin).toBe("/signin");
    expect(APP_ROUTES.profile).toBe("/profile");
  });

  it("defines stable auth API routes", () => {
    expect(API_ROUTES.auth.base).toBe("/api/auth");
    expect(API_ROUTES.auth.splat).toBe("/api/auth/*splat");
    expect(API_ROUTES.auth.callbackGoogle).toBe("/api/auth/callback/google");
  });
});

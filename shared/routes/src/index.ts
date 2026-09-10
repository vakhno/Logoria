export const APP_ROUTES = {
  home: "/",
  signin: "/signin",
  profile: "/profile",
} as const;

export const API_ROUTES = {
  auth: {
    base: "/api/auth",
    splat: "/api/auth/*splat",
    callbackGoogle: "/api/auth/callback/google",
  },
} as const;

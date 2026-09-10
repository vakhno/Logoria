import type { BetterAuthOptions } from "better-auth";
import { admin, bearer } from "better-auth/plugins";
import { API_ROUTES } from "@shared/routes";
import { DEFAULT_USER_ROLE, ROLES_LIST } from "../common/constants.js";
import type { ServerConfigProps } from "../types/index.js";

export function serverConfig({
  database,
  basePath = API_ROUTES.auth.base,
  baseURL,
  secret,
  googleClientId,
  googleClientSecret,
  trustedOrigins,
  useSecureCookies = true,
  cookieSameSite = "none",
  plugins = [admin(), bearer()],
  rateLimit,
}: ServerConfigProps): BetterAuthOptions {
  return {
    database,
    basePath,
    baseURL,
    secret,
    trustedOrigins,
    plugins,
    rateLimit,
    account: {
      storeStateStrategy: "cookie",
    },
    user: {
      additionalFields: {
        role: {
          type: [...ROLES_LIST],
          required: true,
          defaultValue: DEFAULT_USER_ROLE,
          input: false,
        },
      },
    },
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 30 * 60,
      },
    },
    socialProviders: {
      google: {
        clientId: googleClientId,
        clientSecret: googleClientSecret,
        prompt: "select_account",
      },
    },
    advanced: {
      useSecureCookies,
      cookies: {
        session_token: {
          attributes: { sameSite: cookieSameSite, secure: useSecureCookies, httpOnly: true },
        },
        session_data: {
          attributes: { sameSite: cookieSameSite, secure: useSecureCookies, httpOnly: true },
        },
        state: {
          attributes: { sameSite: cookieSameSite, secure: useSecureCookies, httpOnly: true },
        },
        oauth_state: {
          attributes: { sameSite: cookieSameSite, secure: useSecureCookies, httpOnly: true },
        },
      },
    },
  };
}

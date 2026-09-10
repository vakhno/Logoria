import type { BetterAuthOptions } from "better-auth";
import type { createAuthClient } from "better-auth/react";
import { clientConfig } from "../client/client-config.js";
import { serverConfig } from "../server/server-config.js";
import { serverAuth } from "../server/server-auth.js";

export type ClientConfigProps = {
  baseURL?: string;
};

const defaultClientConfig = clientConfig({ baseURL: "" });

export type AuthClient = ReturnType<typeof createAuthClient<typeof defaultClientConfig>>;
export type ClientSession = AuthClient["$Infer"]["Session"];
export type ClientSessionUser = ClientSession["user"];
export type ClientSessionSession = ClientSession["session"];
export type GetSessionClientOptions = Parameters<AuthClient["getSession"]>[0];
export type SocialClientOptions = Parameters<AuthClient["signIn"]["social"]>[0];
export type SignOutClientOptions = Parameters<AuthClient["signOut"]>[0];

export type ServerConfigProps = {
  database: BetterAuthOptions["database"];
  basePath?: string;
  baseURL: string;
  secret: string;
  googleClientId: string;
  googleClientSecret: string;
  trustedOrigins: string[];
  useSecureCookies?: boolean;
  cookieSameSite?: "lax" | "none" | "strict";
  plugins?: BetterAuthOptions["plugins"];
  rateLimit?: BetterAuthOptions["rateLimit"];
};

export type AuthServer = ReturnType<typeof serverAuth>;
export type ServerConfig = ReturnType<typeof serverConfig>;
export type ServerSession = AuthServer["$Infer"]["Session"];
export type ServerSessionUser = ServerSession["user"];
export type ServerSessionSession = ServerSession["session"];
export type GetSessionServerOptions = Parameters<AuthServer["api"]["getSession"]>[0];
export type SocialServerOptions = Parameters<AuthServer["api"]["signInSocial"]>[0];
export type SignOutServerOptions = Parameters<AuthServer["api"]["signOut"]>[0];

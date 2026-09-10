export * from "better-auth/client";
export { createAuthClient } from "./client-auth.js";
export { clientConfig } from "./client-config.js";
export type {
  AuthClient,
  ClientConfigProps,
  ClientSession,
  ClientSessionSession,
  ClientSessionUser,
  GetSessionClientOptions,
  SignOutClientOptions,
  SocialClientOptions,
} from "../types/index.js";

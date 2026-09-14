import { createAuthClient as createBetterAuthClient } from "better-auth/react";
import { clientConfig } from "./client-config.js";
import type { AuthClient, ClientConfigProps } from "../types/index.js";

export function createAuthClient(options: ClientConfigProps): AuthClient {
  return createBetterAuthClient(clientConfig(options));
}

export function getAuthClient(options: ClientConfigProps = {}): AuthClient {
  return createAuthClient(options);
}

import { betterAuth } from "better-auth";
import { serverConfig } from "./server-config.js";
import type { ServerConfigProps } from "../types/index.js";

export function serverAuth(options: ServerConfigProps) {
  return betterAuth(serverConfig(options));
}

import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import type { ClientConfigProps } from "../types/index.js";

export function clientConfig({ baseURL }: ClientConfigProps) {
  return {
    baseURL,
    fetchOptions: {
      credentials: "include" as const,
    },
    plugins: [inferAdditionalFields(), adminClient()],
  };
}

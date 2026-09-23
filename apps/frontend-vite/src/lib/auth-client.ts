import { createAuthClient } from "@shared/auth/client";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_PUBLIC_URL || window.location.origin,
});

import { getRequestSession as getAuthRequestSession } from "@shared/auth/server";
import { auth } from "./auth.js";

export function getRequestSession(req: Parameters<typeof getAuthRequestSession>[1]) {
  return getAuthRequestSession(auth, req);
}

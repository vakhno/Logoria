import { fromNodeHeaders } from "better-auth/node";
import type { AuthServer } from "../types/index.js";

type RequestLike = {
  headers: Record<string, string | string[] | undefined>;
};

export function getRequestSession(auth: AuthServer, req: RequestLike) {
  return auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
}

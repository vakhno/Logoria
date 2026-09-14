import type { ClientSession } from "@shared/auth/types";
import { headers } from "next/headers";

export async function getServerSession(): Promise<ClientSession | null> {
  const requestHeaders = await headers();
  const apiUrl =
    process.env.INTERNAL_API_URL ?? process.env.API_PUBLIC_URL ?? "http://localhost:3002";

  try {
    const response = await fetch(`${apiUrl}/api/auth/get-session`, {
      headers: {
        cookie: requestHeaders.get("cookie") ?? "",
      },
      cache: "no-store",
    });

    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

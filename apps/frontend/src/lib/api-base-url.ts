"use client";

const configuredApiUrl = process.env.API_PUBLIC_URL ?? "http://localhost:3002";

export function getApiBaseUrl() {
  if (typeof window === "undefined") return configuredApiUrl;

  return "";
}

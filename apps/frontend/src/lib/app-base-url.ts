"use client";

const configuredAppUrl = process.env.APP_PUBLIC_URL ?? "http://localhost:3001";

export function getAppBaseUrl() {
  if (typeof window === "undefined") return configuredAppUrl;

  return window.location.origin;
}

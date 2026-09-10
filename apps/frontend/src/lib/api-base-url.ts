"use client";

const configuredApiUrl = process.env.API_PUBLIC_URL ?? "http://localhost:3002";

function getUrlOrFallback(value: string, fallback: string) {
  try {
    return new URL(value);
  } catch {
    return new URL(fallback);
  }
}

function getBrowserApiBaseUrl() {
  const url = getUrlOrFallback(configuredApiUrl, "http://localhost:3002");
  const currentHost = window.location.hostname;

  if (
    (url.hostname === "localhost" || url.hostname === "127.0.0.1") &&
    currentHost !== "localhost" &&
    currentHost !== "127.0.0.1"
  ) {
    url.hostname = currentHost;
  }

  return url.toString().replace(/\/$/, "");
}

export function getApiBaseUrl() {
  if (typeof window === "undefined") return configuredApiUrl;

  return "";
}

export function getSocketBaseUrl() {
  if (typeof window === "undefined") return configuredApiUrl;

  return getBrowserApiBaseUrl();
}

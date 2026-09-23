"use client";

import { createAuthClient } from "@shared/auth/client";
import { getApiBaseUrl } from "./api-base-url";

export const authClient = createAuthClient({ baseURL: getApiBaseUrl() });

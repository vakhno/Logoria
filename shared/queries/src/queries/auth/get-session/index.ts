"use client";

import type { ClientSession } from "@shared/auth/types";
import { getAuthClient } from "@shared/auth/client";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { sessionQueryKey } from "../../../constants/query-keys";

const authClient = getAuthClient();

const getSessionQueryFn = async (): Promise<ClientSession | null> => {
  const { data } = await authClient.getSession();
  return data;
};

type SessionQueryOptions = Omit<
  Partial<UseQueryOptions<ClientSession | null, Error>>,
  "queryKey" | "queryFn"
>;

export function useGetSession(options?: SessionQueryOptions) {
  return useQuery<ClientSession | null, Error>({
    queryKey: sessionQueryKey,
    queryFn: getSessionQueryFn,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    refetchInterval: 10 * 60 * 1000,
    staleTime: 10 * 60 * 1000,
    ...options,
  });
}

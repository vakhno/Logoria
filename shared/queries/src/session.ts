"use client";

import type { ClientSession } from "@shared/auth/types";
import { createAuthClient } from "@shared/auth/client";
import { useMutation, useQuery, useQueryClient, type UseQueryOptions } from "@tanstack/react-query";

const authClient = createAuthClient({ baseURL: "" });

export const sessionQueryKey = ["session"] as const;

const getSessionQueryFn = async (): Promise<ClientSession | null> => {
  const { data } = await authClient.getSession();
  return data;
};

type SessionQueryOptions = Omit<Partial<UseQueryOptions<ClientSession | null, Error>>, "queryKey" | "queryFn">;

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

export function useSignOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { error } = await authClient.signOut();
      if (error) throw error;
    },
    onSuccess: () => queryClient.setQueryData(sessionQueryKey, null),
  });
}

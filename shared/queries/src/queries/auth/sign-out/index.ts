"use client";

import { getAuthClient } from "@shared/auth/client";
import {
  type QueryClient,
  useMutation,
  type UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { sessionQueryKey } from "../../../constants/query-keys";

const authClient = getAuthClient();

export async function signOutMutationFn(): Promise<void> {
  const { error } = await authClient.signOut();
  if (error) throw error;
}

export function signOutOnSuccess(queryClient: QueryClient) {
  queryClient.setQueryData(sessionQueryKey, null);
}

type UseSignOutOptions = Omit<UseMutationOptions<void, Error, void>, "mutationFn">;

type UseSignOutProps = {
  options?: UseSignOutOptions;
};

export function useSignOut({ options }: UseSignOutProps = {}) {
  const queryClient = useQueryClient();
  const { onSuccess, ...mutationOptions } = options ?? {};

  return useMutation({
    ...mutationOptions,
    mutationFn: signOutMutationFn,
    onSuccess: (...args) => {
      signOutOnSuccess(queryClient);
      return onSuccess?.(...args);
    },
  });
}

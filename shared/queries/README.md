# @shared/queries

Shared client-side query hooks built with TanStack Query.

## Current scope

This package owns reusable client-side auth hooks. Queries are
grouped by domain, with one folder per query or mutation.

```text
src/
|-- constants/
|   `-- query-keys.ts                  Shared TanStack Query keys
`-- queries/auth/
    |-- get-session/
    |   `-- index.ts                   Current-session query
    |-- sign-out/
    |   `-- index.ts                   Mutation function, cache update, and hook
    `-- index.ts                       Auth-module public exports
```

## Usage

Use these hooks inside a component rendered below the application's TanStack
Query provider.

```tsx
import { useGetSession, useSignOut } from "@shared/queries";

function AccountMenu() {
  const { data: session, isPending } = useGetSession();
  const signOut = useSignOut();

  if (isPending) return null;

  return session ? <button onClick={() => signOut.mutate()}>Sign out</button> : null;
}
```

## Exports

| Export                                 | Purpose                                                                                            |
| -------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `sessionQueryKey`                      | The canonical TanStack Query key for the current session.                                          |
| `useGetSession`                        | Reads the current session. The query becomes stale after 10 minutes and refetches on window focus. |
| `useSignOut`                           | Signs out the current user and clears the cached session on success.                               |

## Rules

- Import session query hooks from `@shared/queries`; do not duplicate the
  session query key or authentication-client request in screens and components.
- Export reusable query hooks from `src/index.ts`.
- Keep query keys in `src/constants/query-keys.ts`.
- Import endpoint input types from `@shared/schemas`; do not redefine them in
  query modules.
- Update this README when the package's public exports or ownership change.

## Templates for future query modules

Use only the template parts required by the endpoint. A simple read does not
need polling, pagination, optimistic updates, or a custom error type.

### Query keys

Every input that changes a response belongs in its query key. Keep query keys
in `src/constants/`.

```ts
// src/constants/query-keys.ts
// Replace this with the filters accepted by the endpoint.
export type ResourceFilters = Record<string, string | undefined>;

export const resourceKeys = {
  all: ["resources"] as const,
  list: (filters: ResourceFilters) => [...resourceKeys.all, "list", filters] as const,
  detail: (id: string) => [...resourceKeys.all, "detail", id] as const,
};
```

Do not include values that are constant for the whole application, such as one
configured API base URL. Include an API origin only when one browser session
can intentionally query more than one origin.

### Standard query

```ts
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { resourceKeys } from "../../../constants/query-keys";

type Resource = {
  id: string;
  name: string;
};

type GetResourceInput = {
  id: string;
  signal?: AbortSignal;
};

async function getResource({ id, signal }: GetResourceInput): Promise<Resource> {
  const response = await fetch(`/api/resources/${id}`, {
    credentials: "include",
    signal,
  });

  if (!response.ok) throw new Error("Unable to load resource.");

  return response.json();
}

type ResourceQueryKey = ReturnType<typeof resourceKeys.detail>;

type UseResourceOptions = Omit<
  UseQueryOptions<Resource, Error, Resource, ResourceQueryKey>,
  "queryKey" | "queryFn"
>;

export function useResource({ id, options }: { id: string; options?: UseResourceOptions }) {
  const { enabled = true, ...queryOptions } = options ?? {};

  return useQuery({
    ...queryOptions,
    queryKey: resourceKeys.detail(id),
    queryFn: ({ signal }) => getResource({ id, signal }),
    enabled: Boolean(id) && enabled,
  });
}
```

Pass TanStack Query's `signal` to `fetch` so stale requests can be cancelled.
Use `enabled` only when the query depends on an input that may be absent.

### Mutation with cache invalidation

```ts
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { resourceKeys } from "../../../constants/query-keys";

type Resource = {
  id: string;
  name: string;
};

type CreateResourceInput = {
  name: string;
};

async function createResource(input: CreateResourceInput): Promise<Resource> {
  const response = await fetch("/api/resources", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) throw new Error("Unable to create resource.");

  return response.json();
}

type UseCreateResourceOptions = Omit<
  UseMutationOptions<Resource, Error, CreateResourceInput>,
  "mutationFn"
>;

export function useCreateResource({
  options,
}: {
  options?: UseCreateResourceOptions;
} = {}) {
  const queryClient = useQueryClient();
  const { onSuccess, ...mutationOptions } = options ?? {};

  return useMutation({
    ...mutationOptions,
    mutationFn: createResource,
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: resourceKeys.all });
      await onSuccess?.(...args);
    },
  });
}
```

After a successful mutation, invalidate or update every affected cache entry.
When adding package-owned behavior to `onSuccess`, preserve the caller's
callback rather than overwriting it.

### Infinite query

Use this only for an endpoint that returns pages. Include all result-changing
filters, sort order, and page size in the query key.

```ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { resourceKeys } from "../../../constants/query-keys";

type ResourcePage = {
  items: Resource[];
  nextCursor?: string;
};

async function getResourcePage({
  filters,
  cursor,
  signal,
}: {
  filters: ResourceFilters;
  cursor?: string;
  signal?: AbortSignal;
}): Promise<ResourcePage> {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined) params.set(key, value);
  }
  if (cursor) params.set("cursor", cursor);

  const response = await fetch(`/api/resources?${params}`, {
    credentials: "include",
    signal,
  });

  if (!response.ok) throw new Error("Unable to load resources.");

  return response.json();
}

export function useInfiniteResources({ filters }: { filters: ResourceFilters }) {
  return useInfiniteQuery({
    queryKey: resourceKeys.list(filters),
    initialPageParam: undefined as string | undefined,
    queryFn: ({ pageParam, signal }) => getResourcePage({ filters, cursor: pageParam, signal }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}
```

Use the pagination mechanism offered by the API. Prefer a cursor when the API
provides one; use a numeric page only when the API is offset/page based.

## Decision table

| Part                        | Use it when                                | Rule                                                                |
| --------------------------- | ------------------------------------------ | ------------------------------------------------------------------- |
| Typed result and variables  | Always                                     | Do not expose `any` from package hooks.                             |
| Query-key factory           | Always                                     | Include every value that changes returned data.                     |
| Consumer `options`          | Usually                                    | Omit `queryKey`, `queryFn`, and `mutationFn`.                       |
| `enabled`                   | Dependent queries                          | Do not request data until required inputs exist.                    |
| `staleTime` / refetching    | Freshness is known                         | Add only a deliberate cache policy.                                 |
| Cache invalidation/update   | Successful mutation                        | Update or invalidate every affected query key.                      |
| Optimistic update           | Immediate feedback matters                 | Include rollback in `onError`.                                      |
| Infinite query              | The endpoint is paginated                  | Include filters, sorting, and page size in the key.                 |
| Structured API error        | UI needs error codes or fields             | Start with `Error`; add a shared type only when needed.             |
| Shared request/auth helper  | Several endpoints share transport behavior | Centralize it; do not retrieve a token in every hook.               |
| Runtime response validation | An endpoint returns untrusted data         | Validate at the transport boundary with the project's schema tools. |

## Review checklist

- Does the query key contain every result-changing input?
- Does the request pass the query cancellation signal to `fetch`?
- Does a mutation update or invalidate all affected cache entries?
- Are custom `onSuccess`, `onError`, or `onSettled` callbacks preserved when
  package behavior needs them?
- Is polling, optimistic updating, or infinite pagination justified by the
  endpoint rather than added by default?

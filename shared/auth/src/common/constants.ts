export const ROLES = {
  user: "user",
  admin: "admin",
} as const;

export const ROLES_LIST = [ROLES.user, ROLES.admin] as const;

export type Role = (typeof ROLES_LIST)[number];

export const DEFAULT_USER_ROLE = ROLES.user satisfies Role;

export type Role = string;
export type Permission = string;

export type IRBAC = Record<Role, Permission[]>;
export type RoleHierarchy = Record<Role, Role[]>;

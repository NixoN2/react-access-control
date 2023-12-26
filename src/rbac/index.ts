import { IRBAC, Permission, Role, RoleHierarchy } from '../types/rbac';

export class RBAC {
  #rbac: IRBAC;
  #roleHierarchy?: RoleHierarchy;

  constructor(rbac: IRBAC, roleHierarchy?: RoleHierarchy) {
    if (Object.keys(rbac).length === 0) {
      throw new Error('RBAC policies cannot be empty');
    }
    this.#rbac = rbac;
    this.#roleHierarchy = roleHierarchy;
  }

  private isRoleAllowed = (role: Role, permission: Permission): boolean => {
    const rolePermissions = this.#rbac[role];
    return !!rolePermissions && rolePermissions.includes(permission);
  };

  private checkChildRoles = (role: Role, permission: Permission): boolean => {
    const childRoles = this.#roleHierarchy?.[role] || [];
    for (const childRole of childRoles) {
      if (
        this.isRoleAllowed(childRole, permission) ||
        this.checkChildRoles(childRole, permission)
      ) {
        return true;
      }
    }
    return false;
  };

  public checkPermission = (
    role: Role,
    permission: Permission,
    shouldBePermitted = true,
  ): boolean => {
    if (!shouldBePermitted) {
      return false;
    }

    if (!this.#rbac[role]) {
      return false;
    }

    const isRolePermitted = this.isRoleAllowed(role, permission);

    if (this.#roleHierarchy && !isRolePermitted) {
      return this.checkChildRoles(role, permission);
    }

    return isRolePermitted;
  };

  public addRole = (role: Role | Role[]): void => {
    const roles = Array.isArray(role) ? role : [role];
    for (const r of roles) {
      if (this.#rbac[r]) {
        throw new Error(`Role ${r} already exists`);
      }
      this.#rbac[r] = [];
    }
  };

  public addPermissionToRole = (
    role: Role,
    permission: Permission | Permission[],
  ): void => {
    if (!this.#rbac[role]) {
      throw new Error(`Role ${role} does not exist`);
    }
    const permissions = Array.isArray(permission) ? permission : [permission];
    for (const p of permissions) {
      if (this.#rbac[role].includes(p)) {
        throw new Error(`Permission ${p} already exists for role ${role}`);
      }
      this.#rbac[role].push(p);
    }
  };
}

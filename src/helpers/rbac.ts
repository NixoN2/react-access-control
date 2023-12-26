import { RBAC } from '../rbac';
import { Permission, Role } from '../types/rbac';

export const isAuthorized = (
  role: Role,
  permission: Permission,
  rbac: RBAC,
  shouldBePermitted = true,
): boolean => {
  if (!shouldBePermitted) {
    return false;
  }
  return rbac.checkPermission(role, permission);
};

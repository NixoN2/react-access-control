import { RBAC } from '../rbac';
import type { FC, PropsWithChildren, ReactNode } from 'react';
import { Permission, Role } from '../types/rbac';

interface AccessControlProps {
  role: Role;
  permission: Permission;
  rbac: RBAC;
  fallback: ReactNode;
  shouldBePermitted?: boolean;
}

export const AccessControl: FC<PropsWithChildren<AccessControlProps>> = ({
  role,
  permission,
  rbac,
  children,
  fallback,
  shouldBePermitted = true,
}) => {
  if (rbac.checkPermission(role, permission) && shouldBePermitted) {
    return children;
  }
  return fallback;
};

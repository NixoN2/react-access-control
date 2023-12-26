import { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { RBAC } from '../rbac';
import { Permission, Role } from '../types/rbac';

interface ProtectedRouteProps {
  rbac: RBAC;
  role: Role;
  permission: Permission;
  onUnauthorized: (redirectPath: string) => void;
  shouldBePermitted?: boolean;
  redirectPath: string;
}

export const ProtectedRoute: FC<PropsWithChildren<ProtectedRouteProps>> = ({
  rbac,
  role,
  permission,
  onUnauthorized,
  shouldBePermitted = true,
  redirectPath,
  children,
}) => {
  const isPermitted =
    shouldBePermitted && rbac.checkPermission(role, permission);

  if (!isPermitted && onUnauthorized) {
    onUnauthorized(redirectPath);
    return <Navigate to={redirectPath} />;
  }

  return children;
};

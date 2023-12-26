import { FC, useEffect } from 'react';
import { PathRouteProps, Route, useNavigate } from 'react-router-dom';
import { RBAC } from '../rbac';
import { Permission, Role } from '../types/rbac';

interface ProtectedRouteProps extends PathRouteProps {
  rbac: RBAC;
  role: Role;
  permission: Permission;
  onUnauthorized: (redirectPath?: string) => void;
  shouldBePermitted?: boolean;
  redirectPath?: string;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  rbac,
  role,
  permission,
  onUnauthorized,
  shouldBePermitted = true,
  redirectPath,
  ...rest
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isPermitted =
      shouldBePermitted && rbac.checkPermission(role, permission);
    if (!isPermitted) {
      onUnauthorized(redirectPath);
      if (redirectPath) {
        navigate(redirectPath);
      }
    }
  }, [rbac, role, permission, onUnauthorized, redirectPath, shouldBePermitted]);

  return <Route {...rest} />;
};

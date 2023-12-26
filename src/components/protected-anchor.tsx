import React from 'react';
import { RBAC } from '../rbac';
import type { AnchorHTMLAttributes, FC, PropsWithChildren } from 'react';
import { Permission, Role } from '../types/rbac';

interface ProtectedAnchor extends AnchorHTMLAttributes<HTMLAnchorElement> {
  role: Role;
  permission: Permission;
  rbac: RBAC;
  onUnauthorized: () => void;
  shouldBePermitted?: boolean;
}

export const ProtectedAnchor: FC<PropsWithChildren<ProtectedAnchor>> = ({
  role,
  permission,
  rbac,
  children,
  onUnauthorized,
  shouldBePermitted = true,
  ...rest
}) => {
  const isPermitted =
    shouldBePermitted && rbac.checkPermission(role, permission);

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    if (!isPermitted) {
      event.preventDefault();
      onUnauthorized();
    }
  };

  return (
    <a {...rest} onClick={handleClick}>
      {children}
    </a>
  );
};

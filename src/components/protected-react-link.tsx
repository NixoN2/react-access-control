import { FC } from 'react';
import { RBAC } from '../rbac';
import type { LinkProps } from 'react-router-dom';
import { Permission, Role } from '../types/rbac';

import { Link } from 'react-router-dom';

interface ProtectedReactLinkProps extends LinkProps {
  role: Role;
  permission: Permission;
  rbac: RBAC;
  onUnauthorized: () => void;
  shouldBePermitted?: boolean;
}

export const ProtectedReactLink: FC<ProtectedReactLinkProps> = ({
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
    <Link {...rest} onClick={isPermitted ? undefined : handleClick}>
      {children}
    </Link>
  );
};

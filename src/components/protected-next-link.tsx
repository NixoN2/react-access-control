import { FC, PropsWithChildren } from 'react';
import Link from 'next/link';
import { RBAC } from '../rbac';
import { Permission, Role } from '../types/rbac';
import { LinkProps as NextLinkProps } from 'next/link';

interface ProtectedNextLinkProps extends NextLinkProps {
  role: Role;
  permission: Permission;
  rbac: RBAC;
  onUnauthorized: () => void;
  shouldBePermitted?: boolean;
}

export const ProtectedNextLink: FC<
  PropsWithChildren<ProtectedNextLinkProps>
> = ({
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

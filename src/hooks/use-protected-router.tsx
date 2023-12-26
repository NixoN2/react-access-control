import { useRouter, NextRouter } from 'next/router';
import { RBAC } from '../rbac';
import { Permission, Role } from '../types/rbac';

export const useProtectedRouter = (role: Role, rbac: RBAC) => {
  const router = useRouter();

  const push = (
    pushParams: Parameters<NextRouter['push']>,
    permission: Permission,
    onUnauthorized: () => void,
    shouldBePermitted?: boolean,
  ) => {
    const isPermitted =
      shouldBePermitted && rbac.checkPermission(role, permission);

    if (!isPermitted) {
      onUnauthorized();
      return;
    }

    router.push(pushParams);
  };

  return { ...router, push };
};

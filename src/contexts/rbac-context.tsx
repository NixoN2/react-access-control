import { createContext, useContext, FC, PropsWithChildren } from 'react';
import { RBAC } from '../rbac';

interface RBACContextProps {
  rbac: RBAC;
}

const RBACContext = createContext<RBAC | null>(null);

export const RBACProvider: FC<PropsWithChildren<RBACContextProps>> = ({
  rbac,
  children,
}) => {
  return <RBACContext.Provider value={rbac}>{children}</RBACContext.Provider>;
};

export const useRBAC = (): RBAC | null => {
  return useContext(RBACContext);
};

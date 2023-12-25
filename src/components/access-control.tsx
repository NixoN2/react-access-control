import { RBAC } from "../rbac";
import type { FC, PropsWithChildren, ReactNode } from "react"
import { Permission, Role } from "../types/rbac";

interface AccessControlProps {
    role: Role
    permission: Permission
    rbac: RBAC
    fallback: ReactNode
}

export const AccessControl: FC<PropsWithChildren<AccessControlProps>> = ({role, permission, rbac, children, fallback}) => {
    if (rbac.checkPermission(role, permission)) {
        return children
    }
    return fallback
}
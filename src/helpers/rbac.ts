import { RBAC } from "../rbac";
import { Permission, Role } from "../types/rbac";

export const isAuthorized = (role: Role, permission: Permission, rbac: RBAC): boolean => {
    return rbac.checkPermission(role, permission)
}
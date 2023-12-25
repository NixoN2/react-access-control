import { IRBAC, Permission, Role } from "../types/rbac";

export class RBAC {
    #rbac: IRBAC | null = null 

    constructor(rbac: IRBAC) {
        this.initializeRBAC(rbac);
    }

    private initializeRBAC = (rbac: IRBAC): void => {
        if (!rbac) {
            throw new Error("RBAC policies cannot be empty");
        }
        this.#rbac = rbac;
    }

    private checkRBACInitialized = (): void => {
        if (!this.#rbac) {
            throw new Error("RBAC policies are not initialized");
        } 
    }

    public checkPermission = (role: Role, permission: Permission): boolean => {
        this.checkRBACInitialized();
        return !!(this.#rbac![role]?.includes(permission));
    }

    public addRole = (role: Role): void => {
        this.checkRBACInitialized();
        if (!this.#rbac![role]) {
            this.#rbac![role] = [];
        }
    }

    public addPermissionToRole = (role: Role, permission: Permission): void => {
        this.checkRBACInitialized();
        if (!this.#rbac![role]) {
            throw new Error(`Role ${role} does not exist`);
        }
        if (!this.#rbac![role].includes(permission)) {
            this.#rbac![role].push(permission);
        }
    }
}

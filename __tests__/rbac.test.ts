import { RBAC } from '../src/rbac';

describe('Testing RBAC', () => {
  describe('Testing empty RBAC', () => {
    it('Throws error if empty policies provided', () => {
      expect(() => {
        new RBAC({});
      }).toThrow('RBAC policies cannot be empty');
    });
  });
  describe('Testing RBAC without role hierarchy', () => {
    it('Main functions work correctly', () => {
      const rbac = new RBAC({
        user: ['read'],
      });

      expect(rbac.checkPermission('user', 'read')).toBe(true);
      expect(rbac.checkPermission('user', 'read', false)).toBe(false);

      expect(() => {
        rbac.addRole('user');
      }).toThrow('Role user already exists');
      expect(() => {
        rbac.addPermissionToRole('admin', 'write');
      }).toThrow('Role admin does not exist');
      expect(() => {
        rbac.addPermissionToRole('user', 'read');
      }).toThrow(`Permission read already exists for role user`);

      rbac.addRole('admin');
      rbac.addPermissionToRole('admin', 'read');
      expect(rbac.checkPermission('admin', 'read')).toBe(true);
      expect(rbac.checkPermission('admin', 'write')).toBe(false);

      expect(rbac.checkPermission('moderator', 'read')).toBe(false);
    });
  });
  describe('Testing RBAC with role hierarchy', () => {
    it('Throws error when provided with incorrect role hierarchy', () => {
      expect(() => {
        new RBAC({ moderator: [] }, { admin: ['user'] });
      }).toThrow('Role admin must exist in RBAC');
      expect(() => {
        new RBAC({ admin: [] }, { admin: ['user'] });
      }).toThrow('Role user must exist in RBAC');
      expect(() => {
        new RBAC({ admin: [], user: [] }, { admin: ['user'], user: ['admin'] });
      }).toThrow('Cyclic relationship found between roles: admin and user');
    });
    it('Main functions work correctly', () => {
      const rbac = new RBAC(
        {
          user: ['read'],
          admin: ['write'],
        },
        { admin: ['user'] },
      );
      expect(rbac.checkPermission('admin', 'write')).toBe(true);
      expect(rbac.checkPermission('admin', 'read')).toBe(true);
      expect(rbac.checkPermission('user', 'write')).toBe(false);

      rbac.addPermissionToRole('admin', ['update', 'delete']);
      expect(rbac.checkPermission('admin', 'update')).toBe(true);
      expect(rbac.checkPermission('admin', 'delete')).toBe(true);

      rbac.addRole(['user1', 'user2']);
      rbac.addPermissionToRole('user1', 'read');
      expect(rbac.checkPermission('user1', 'read')).toBe(true);
      rbac.addPermissionToRole('user2', 'read');
      expect(rbac.checkPermission('user2', 'read')).toBe(true);

      expect(rbac.checkPermission('admin', 'not exists')).toBe(false);

      expect(() => {
        rbac.addRoleToHierarchy('moderator', 'user');
      }).toThrow('Role moderator must exist in RBAC');

      expect(() => {
        rbac.addRoleToHierarchy('admin', 'moderator');
      }).toThrow('Role moderator must exist in RBAC');

      expect(() => {
        rbac.addRoleToHierarchy('admin', 'user');
      }).toThrow('Role admin already inherits from user');

      expect(() => {
        rbac.addRoleToHierarchy('user', 'admin');
      }).toThrow('Cyclic relationship found between roles: admin and user');

      rbac.addRole('moderator');
      rbac.addPermissionToRole('moderator', 'edit');
      rbac.addRoleToHierarchy('moderator', 'user');
      expect(rbac.checkPermission('moderator', 'read')).toBe(true);
      rbac.addRoleToHierarchy('admin', 'moderator');
      expect(rbac.checkPermission('admin', 'edit')).toBe(true);
    });
  });
});

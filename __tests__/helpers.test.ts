import { RBAC } from '../src/rbac';
import { isAuthorized } from '../src/helpers/rbac';

describe('Testing isAuthorized', () => {
  it('works', () => {
    const rbac = new RBAC({ user: ['write'] });
    expect(isAuthorized('user', 'write', rbac)).toBe(true);
    expect(isAuthorized('user', 'read', rbac)).toBe(false);
    expect(isAuthorized('user', 'write', rbac, false)).toBe(false);
    expect(isAuthorized('admin', 'write', rbac)).toBe(false);
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import { RBACProvider, useRBAC } from '../src/contexts/rbac-context';
import { RBAC } from '../src/rbac';

describe('Testing RBACContext and userRBAC', () => {
  it('provides RBAC instance through context', () => {
    const rbac = new RBAC({ admin: ['write'], user: ['read'] });
    let contextValue: RBAC | null = null;

    const TestComponent = () => {
      contextValue = useRBAC();
      return null;
    };

    render(
      <RBACProvider rbac={rbac}>
        <TestComponent />
      </RBACProvider>,
    );

    expect(contextValue).toBe(rbac);
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import { RBAC } from '../src/rbac';
import '@testing-library/jest-dom';
import { AccessControl } from '../src/components/access-control';

describe('Testing AccessControl Component', () => {
  const mockRbac = new RBAC({ admin: ['write'] });

  test('renders children when permission is granted', () => {
    const { getByText } = render(
      <AccessControl
        role="admin"
        permission="write"
        rbac={mockRbac}
        fallback={<div>Fallback Content</div>}
      >
        <div>Authorized Content</div>
      </AccessControl>,
    );

    expect(getByText('Authorized Content')).toBeInTheDocument();
  });

  test('renders fallback when permission is denied', () => {
    const { getByText } = render(
      <AccessControl
        role="admin"
        permission="read"
        rbac={mockRbac}
        fallback={<div>Fallback Content</div>}
      >
        <div>Authorized Content</div>
      </AccessControl>,
    );

    expect(getByText('Fallback Content')).toBeInTheDocument();
  });

  test('renders fallback when permission is denied programmatically', () => {
    const { getByText } = render(
      <AccessControl
        role="admin"
        permission="write"
        shouldBePermitted={false}
        rbac={mockRbac}
        fallback={<div>Fallback Content</div>}
      >
        <div>Authorized Content</div>
      </AccessControl>,
    );

    expect(getByText('Fallback Content')).toBeInTheDocument();
  });
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { RBAC } from '../src/rbac';
import '@testing-library/jest-dom';
import { ProtectedAnchor } from '../src/components/protected-anchor';

describe('Testing ProtectedAnchor Component', () => {
  const mockRbac = new RBAC({ admin: ['write'] });

  test('renders anchor when permission is granted', () => {
    const handleUnauthorized = jest.fn();
    const { getByText } = render(
      <ProtectedAnchor
        role="admin"
        permission="write"
        rbac={mockRbac}
        onUnauthorized={handleUnauthorized}
      >
        Anchor Text
      </ProtectedAnchor>,
    );

    const anchorElement = getByText('Anchor Text');
    expect(anchorElement).toBeInTheDocument();
    fireEvent.click(anchorElement);
    expect(handleUnauthorized).not.toHaveBeenCalled();
  });

  test('prevents click when permission is denied', () => {
    const handleUnauthorized = jest.fn();
    const { getByText } = render(
      <ProtectedAnchor
        role="admin"
        permission="read"
        rbac={mockRbac}
        onUnauthorized={handleUnauthorized}
      >
        Anchor Text
      </ProtectedAnchor>,
    );

    const anchorElement = getByText('Anchor Text');
    fireEvent.click(anchorElement);

    expect(handleUnauthorized).toHaveBeenCalled();
  });

  test('prevents click when permission is denied programmatically', () => {
    const handleUnauthorized = jest.fn();
    const { getByText } = render(
      <ProtectedAnchor
        role="admin"
        permission="write"
        shouldBePermitted={false}
        rbac={mockRbac}
        onUnauthorized={handleUnauthorized}
      >
        Anchor Text
      </ProtectedAnchor>,
    );

    const anchorElement = getByText('Anchor Text');
    fireEvent.click(anchorElement);

    expect(handleUnauthorized).toHaveBeenCalled();
  });
});

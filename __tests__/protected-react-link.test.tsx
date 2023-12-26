import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { RBAC } from '../src/rbac';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { ProtectedReactLink } from '../src/components/protected-react-link';

describe('Testing ProtectedReactLink Component', () => {
  const mockRbac = new RBAC({ admin: ['write'] });

  test('renders link when permission is granted', () => {
    const handleUnauthorized = jest.fn();
    const { getByText } = render(
      <MemoryRouter>
        <ProtectedReactLink
          to="/"
          role="admin"
          permission="write"
          rbac={mockRbac}
          onUnauthorized={handleUnauthorized}
        >
          Link Text
        </ProtectedReactLink>
      </MemoryRouter>,
    );

    const anchorElement = getByText('Link Text');
    expect(anchorElement).toBeInTheDocument();
    fireEvent.click(anchorElement);
    expect(handleUnauthorized).not.toHaveBeenCalled();
  });

  test('prevents click when permission is denied', () => {
    const handleUnauthorized = jest.fn();
    const { getByText } = render(
      <MemoryRouter>
        <ProtectedReactLink
          to="/"
          role="admin"
          permission="read"
          rbac={mockRbac}
          onUnauthorized={handleUnauthorized}
        >
          Link Text
        </ProtectedReactLink>
      </MemoryRouter>,
    );

    const anchorElement = getByText('Link Text');
    fireEvent.click(anchorElement);

    expect(handleUnauthorized).toHaveBeenCalled();
  });

  test('prevents click when permission is denied programmatically', () => {
    const handleUnauthorized = jest.fn();
    const { getByText } = render(
      <MemoryRouter>
        <ProtectedReactLink
          to="/"
          role="admin"
          shouldBePermitted={false}
          permission="write"
          rbac={mockRbac}
          onUnauthorized={handleUnauthorized}
        >
          Link Text
        </ProtectedReactLink>
      </MemoryRouter>,
    );

    const anchorElement = getByText('Link Text');
    fireEvent.click(anchorElement);

    expect(handleUnauthorized).toHaveBeenCalled();
  });
});

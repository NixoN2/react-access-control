import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { RBAC } from '../src/rbac';
import { ProtectedRoute } from '../src/components/protected-route';
import '@testing-library/jest-dom';

describe('Testing ProtectedRoute Component', () => {
  const mockRbac = new RBAC({ admin: ['write'] });

  test('redirects when permission is denied', () => {
    const handleUnauthorized = jest.fn();
    const { getByText } = render(
      <MemoryRouter initialEntries={['/protected']} initialIndex={0}>
        <Routes>
          <Route path="/unauthorized" element={<div>authorize</div>} />
          <Route
            path="/protected"
            element={
              <ProtectedRoute
                role="admin"
                permission="read"
                rbac={mockRbac}
                onUnauthorized={handleUnauthorized}
                redirectPath="/unauthorized"
              >
                test
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
    );
    expect(getByText('authorize')).toBeInTheDocument();
    expect(handleUnauthorized).toHaveBeenCalledWith('/unauthorized');
  });
  test('redirects when permission is denied programmatically', () => {
    const handleUnauthorized = jest.fn();
    const { getByText } = render(
      <MemoryRouter initialEntries={['/protected']} initialIndex={0}>
        <Routes>
          <Route path="/unauthorized" element={<div>authorize</div>} />
          <Route
            path="/protected"
            element={
              <ProtectedRoute
                role="admin"
                permission="write"
                shouldBePermitted={false}
                rbac={mockRbac}
                onUnauthorized={handleUnauthorized}
                redirectPath="/unauthorized"
              >
                test
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
    );
    expect(getByText('authorize')).toBeInTheDocument();
    expect(handleUnauthorized).toHaveBeenCalledWith('/unauthorized');
  });
  test('Renders test if permission is granted', () => {
    const handleUnauthorized = jest.fn();
    const { getByText } = render(
      <MemoryRouter initialEntries={['/protected']} initialIndex={0}>
        <Routes>
          <Route path="/unauthorized" element={<div>authorize</div>} />
          <Route
            path="/protected"
            element={
              <ProtectedRoute
                role="admin"
                permission="write"
                rbac={mockRbac}
                onUnauthorized={handleUnauthorized}
                redirectPath="/unauthorized"
              >
                test
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
    );
    expect(getByText('test')).toBeInTheDocument();
    expect(handleUnauthorized).not.toHaveBeenCalled();
  });
});

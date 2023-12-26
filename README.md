# React Role Access

Integrate role-based access control into your React application effortlessly.

## Installation

Install via npm:

```bash
npm install react-role-access
```

## Usage 

### RBAC class

This library has several features in terms of access control: Roles, Permissions, Role Hierarchy and Programmatic permissions. 
Each component and function has parameter shouldBePermitted to allow developers to block some functions even if role has needed permissions. 

```ts
import { RBAC } from 'react-role-access';

const rbacPolicies = {
  admin: ['write', 'read'],
  user: ['read'],
};

const rbac = new RBAC(rbacPolicies);

const isAdminWritePermitted = rbac.checkPermission('admin', 'write'); // true
const isUserWritePermitted = rbac.checkPermission('user', 'write'); // false

// Let's say that admin can't write more than 3 times
const adminWriteCount = 3
const isAdminWritePermitted = rbac.checkPermission('admin', 'write', adminWriteCount < 4) // false

// Adding new role
rbac.addRole('manager');
rbac.addPermissionToRole('manager', ['write', 'delete']);

// Define role hierarchy
const roleHierarchy = {
  admin: ['manager', 'user'],
  manager: ['user'],
};

const rbacWithHierarchy = new RBAC(rbacPolicies, roleHierarchy);
const isManagerWritePermitted = rbacWithHierarchy.checkPermission('manager', 'write'); // false
```

### Access Control component 

```ts
import { AccessControl, RBAC } from 'react-role-access';

const rbac = new RBAC(/* Define RBAC policies */);

// Render component based on permission
<AccessControl
  role="admin"
  permission="write"
  rbac={rbac}
  fallback={<UnauthorizedComponent />}
>
  <AuthorizedComponent />
</AccessControl>
```

### ProtectedAnchor/ProtectedReactLink/ProtectedNextLink

```ts
import { ProtectedAnchor, RBAC } from 'react-role-access';


const rbac = new RBAC(/* Define RBAC policies */);

<ProtectedAnchor
  role="admin"
  permission="write"
  rbac={rbac}
  onUnauthorized={() => alert('Unauthorized')}
  href="/some-path"
>
  Navigate
</ProtectedAnchor>
```

You also can use ProtectedNextLink and ProtectedReactLink the same way

### ProtectedRoute

```ts
import { ProtectedRoute, RBAC } from 'react-role-access';

const rbac = new RBAC(/* Define RBAC policies */);

<ProtectedRoute
  rbac={rbac}
  role="admin"
  permission="write"
  onUnauthorized={(redirectPath) => {
    console.log(`Unauthorized access, redirecting to: ${redirectPath}`);
  }}
  redirectPath="/auth"
  path="/protected-route"
  element={<ProtectedComponent />}
/>;

```

### UseProtectedRouter

```ts
import { useProtectedRouter, RBAC } from 'react-role-access';

const rbac = new RBAC(/* Define RBAC policies */);

// Initialize protected router hook inside of component
const protectedRouter = useProtectedRouter('admin', rbac);

// Use the protected push method
protectedRouter.push(
  {
    pathname: '/protected-route',
    query: { id: '123' },
  },
  'write',
  () => console.log('Unauthorized access'),
);

```

### IsAuthorized

```ts
import { isAuthorized, RBAC } from 'react-role-access';

const rbac = new RBAC(/* Define RBAC policies */);

console.log(isAuthorized("user", "read", rbac)) // boolean
```
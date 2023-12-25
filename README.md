<<<<<<< HEAD
# react-access-control
Integrate role-based access control into your React application effortlessly
=======
# React Role Access

Integrate role-based access control into your React application effortlessly.

## Installation

Install via npm:

```bash
npm install react-role-access
```

## Usage 

### RBAC class

```ts
import { RBAC } from "react-role-access";

const rbac = new RBAC(/* Define RBAC policies */);

rbac.addRole('admin');
rbac.addPermissionToRole('admin', 'write');

const isAuthorized = rbac.checkPermission('admin', 'write'); // Returns boolean
```

### Access Control component 

```ts
import { AccessControl } from "react-role-access";

<AccessControl role="admin" permission="write" rbac={rbacInstance} fallback={<UnauthorizedComponent />}>
  <AuthorizedComponent />
</AccessControl>
```

>>>>>>> master

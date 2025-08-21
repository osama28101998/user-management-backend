User Management Backend
Overview
This backend, built with Node.js, Express, TypeScript, and MongoDB, provides a robust API for user management with role-based access control (RBAC). It includes endpoints for user authentication, user management, role management, permission management, and role/permission assignment. The application uses JWT for authentication and Mongoose for MongoDB interactions. Routes are defined in src/routes/ (authRoutes.ts, userRoutes.ts, roleRoutes.ts, permissionRoutes.ts) with middleware (authMiddleware.ts, roleMiddleware.ts) enforcing authentication and permission checks.
Since the requirements did not specify how to create the initial user, role, or permissions, I temporarily disabled middleware for /api/permissions, /api/roles, and /api/users/assign-role to create the first admin user, role, and permissions via Postman, then restored the middleware to stay within scope. Alternatively, a bootstrap script (src/bootstrap.ts) can initialize the database with an admin user, role, and permissions.
Setup

Clone the Repository:
git clone <repository-url>
cd user-management-backend


Install Dependencies:
npm install


Configure Environment:

Rename .env.example to .env and update:MONGODB_URI=mongodb://localhost:27017/user_management
JWT_SECRET=your_jwt_secret_key
PORT=5000




Run MongoDB:

Ensure MongoDB is running locally (mongod).


Initialize Database (Optional):

Run the bootstrap script to create an admin user, role, and permissions:npm run bootstrap




Start the Server:
npm run dev



API Routes
All routes are prefixed with /api. Most endpoints require authentication via a JWT token in the Authorization header (Bearer <token>). Protected endpoints also require specific permissions (e.g., view_users, create_role) enforced by roleMiddleware.ts.
Authentication Routes (/api/auth)
Defined in src/routes/authRoutes.ts.



Endpoint
Method
Description
Middleware
Payload
Example



/auth/register
POST
Register a new user
authMiddleware, checkPermission('create_user')
{ "username": "string", "email": "string", "password": "string", "roles": ["string"] }
curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -H "Authorization: Bearer <jwt_token>" -d '{"username":"user1","email":"user1@example.com","password":"password123","roles":["68a32a95d53569f178d52b38"]}'


/auth/login
POST
Login and receive JWT token
None
{ "email": "string", "password": "string" }
curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{"email":"admin@gmail.com","password":"password123"}'


User Routes (/api/users)
Defined in src/routes/userRoutes.ts.



Endpoint
Method
Description
Middleware
Payload
Example



/users
GET
Get all users
authMiddleware, checkPermission('view_users')
None
curl -H "Authorization: Bearer <jwt_token>" http://localhost:5000/api/users


/users/:id
GET
Get user by ID
authMiddleware, checkPermission('view_user')
None
curl -H "Authorization: Bearer <jwt_token>" http://localhost:5000/api/users/68a32a95d53569f178d52b2b


/users
POST
Create a new user
authMiddleware, checkPermission('create_user')
{ "username": "string", "email": "string", "password": "string", "roles": ["string"], "permissions": ["string"] }
curl -X POST http://localhost:5000/api/users -H "Content-Type: application/json" -H "Authorization: Bearer <jwt_token>" -d '{"username":"user2","email":"user2@example.com","password":"password123","roles":["68a32a95d53569f178d52b38"]}'


/users/:id
PUT
Update a user
authMiddleware, checkPermission('update_user')
{ "username": "string", "email": "string" }
curl -X PUT http://localhost:5000/api/users/68a32a95d53569f178d52b2b -H "Content-Type: application/json" -H "Authorization: Bearer <jwt_token>" -d '{"username":"updated_user","email":"updated@example.com"}'


/users/:id
DELETE
Delete a user
authMiddleware, checkPermission('delete_user')
None
curl -X DELETE http://localhost:5000/api/users/68a32a95d53569f178d52b2b -H "Authorization: Bearer <jwt_token>"


/users/assign-role
POST
Assign a role to a user
authMiddleware, checkPermission('assign_role')
{ "userId": "string", "roleId": "string" }
curl -X POST http://localhost:5000/api/users/assign-role -H "Content-Type: application/json" -H "Authorization: Bearer <jwt_token>" -d '{"userId":"68a32a95d53569f178d52b2b","roleId":"68a32a95d53569f178d52b38"}'


/users/assign-permission
POST
Assign a permission to a user
authMiddleware, checkPermission('assign_permission')
{ "userId": "string", "permissionId": "string" }
curl -X POST http://localhost:5000/api/users/assign-permission -H "Content-Type: application/json" -H "Authorization: Bearer <jwt_token>" -d '{"userId":"68a32a95d53569f178d52b2b","permissionId":"68a32a95d53569f178d52b39"}'


Role Routes (/api/roles)
Defined in src/routes/roleRoutes.ts.



Endpoint
Method
Description
Middleware
Payload
Example



/roles
GET
Get all roles
authMiddleware, checkPermission('view_roles')
None
curl -H "Authorization: Bearer <jwt_token>" http://localhost:5000/api/roles


/roles/:id
GET
Get role by ID
authMiddleware, checkPermission('view_role')
None
curl -H "Authorization: Bearer <jwt_token>" http://localhost:5000/api/roles/68a32a95d53569f178d52b38


/roles
POST
Create a new role
authMiddleware, checkPermission('create_role')
{ "name": "string", "permissions": ["string"] }
curl -X POST http://localhost:5000/api/roles -H "Content-Type: application/json" -H "Authorization: Bearer <jwt_token>" -d '{"name":"new_role","permissions":["68a32a95d53569f178d52b39"]}'


/roles/:id
PUT
Update a role
authMiddleware, checkPermission('update_role')
{ "name": "string", "permissions": ["string"] }
curl -X PUT http://localhost:5000/api/roles/68a32a95d53569f178d52b38 -H "Content-Type: application/json" -H "Authorization: Bearer <jwt_token>" -d '{"name":"updated_role","permissions":["68a32a95d53569f178d52b39"]}'


/roles/:id
DELETE
Delete a role
authMiddleware, checkPermission('delete_role')
None
curl -X DELETE http://localhost:5000/api/roles/68a32a95d53569f178d52b38 -H "Authorization: Bearer <jwt_token>"


/roles/assign-permission
POST
Assign a permission to a role
authMiddleware, checkPermission('assign_permission')
{ "roleId": "string", "permissionId": "string" }
curl -X POST http://localhost:5000/api/roles/assign-permission -H "Content-Type: application/json" -H "Authorization: Bearer <jwt_token>" -d '{"roleId":"68a32a95d53569f178d52b38","permissionId":"68a32a95d53569f178d52b39"}'


Permission Routes (/api/permissions)
Defined in src/routes/permissionRoutes.ts.



Endpoint
Method
Description
Middleware
Payload
Example



/permissions
GET
Get all permissions
authMiddleware, checkPermission('view_permissions')
None
curl -H "Authorization: Bearer <jwt_token>" http://localhost:5000/api/permissions


/permissions/:id
GET
Get permission by ID
authMiddleware, checkPermission('view_permission')
None
curl -H "Authorization: Bearer <jwt_token>" http://localhost:5000/api/permissions/68a32a95d53569f178d52b39


/permissions
POST
Create a new permission
authMiddleware, checkPermission('create_permission')
{ "name": "string", "description": "string" }
curl -X POST http://localhost:5000/api/permissions -H "Content-Type: application/json" -H "Authorization: Bearer <jwt_token>" -d '{"name":"new_permission","description":"New permission"}'


/permissions/:id
PUT
Update a permission
authMiddleware, checkPermission('update_permission')
{ "name": "string", "description": "string" }
curl -X PUT http://localhost:5000/api/permissions/68a32a95d53569f178d52b39 -H "Content-Type: application/json" -H "Authorization: Bearer <jwt_token>" -d '{"name":"updated_permission","description":"Updated permission"}'


/permissions/:id
DELETE
Delete a permission
authMiddleware, checkPermission('delete_permission')
None
curl -X DELETE http://localhost:5000/api/permissions/68a32a95d53569f178d52b39 -H "Authorization: Bearer <jwt_token>"


Initial Setup Notes
The requirements did not specify how to create the first user, role, or permissions. To bootstrap the system:

I temporarily disabled middleware for /api/permissions, /api/roles, and /api/users/assign-role in their respective route files to create the initial admin user, role, and permissions via Postman. After setup, middleware was restored to enforce authentication and permission checks.
Alternatively, use the src/bootstrap.ts script (npm run bootstrap) to create:
Permissions: create_user, view_users, update_user, delete_user, create_role, view_roles, update_role, delete_role, create_permission, view_permissions, update_permission, delete_permission, assign_role, assign_permission.
An admin role with all permissions.
An ADMIN user (admin@gmail.com, password123) with the admin role.



Usage Instructions

Get a JWT Token:

Use /api/auth/login to authenticate:curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{"email":"admin@gmail.com","password":"password123"}'


Save the token from the response.


Test Protected Endpoints:

Include the JWT token in the Authorization header for all protected routes (e.g., /api/users, /api/roles/assign-permission).
Example: Assign the admin role to a user:curl -X POST http://localhost:5000/api/users/assign-role -H "Content-Type: application/json" -H "Authorization: Bearer <jwt_token>" -d '{"userId":"68a337628b9838543457d67f","roleId":"68a32a95d53569f178d52b38"}'




Debugging:

Check MongoDB data:mongosh
use user_management
db.users.find()
db.roles.find()
db.permissions.find()


If 403 Permission Denied errors occur, verify that the user’s role includes the required permissions (e.g., assign_role, assign_permission).



Dependencies

Node.js: ^18.x
Express: ^4.18.2
Mongoose: ^7.0.0
JSONWebToken: ^9.0.0
BcryptJS: ^2.4.3
Dotenv: ^16.0.3
TypeScript: ^5.0.2
See package.json for full list.

Scripts

npm run dev: Start development server with nodemon.
npm run build: Compile TypeScript to JavaScript.
npm run start: Run the compiled application.
npm run bootstrap: Initialize database with admin user, role, and permissions.

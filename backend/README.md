## Backend

### Files

- Please create a ".env" file in the src folder and add the variables mentioned in the email
- Run `npm i` to install the required modules

Terminal: Run `npm run start:dev` to start the development server.

### Features

- jwt.auth.guard.ts to check if the request is authorized using (jwt authentication)

    # src/employees:
      - employees.controller.ts to handle all the CRUD operations for employees
      - employees.service.ts to manage logic for employee operations
      - employees.module.ts to integrate mongo and UsersModule to use the jwt guard
      - dto/create-employee.dto.ts to define the create employee DTO

    # src/users
      - users.controller.ts to handle all the CRUD operations for users
      - users.service.ts to manage logic for user operations
      - users.module.ts to integrate mongo and jwt modules

    # src/schemas
      - Defining the employees and user schema

# Libraries

- class-validator for input validation
- class-transformer to transform plain objects to class objects
- mongodb for database
- passport for authentication
- bcrypt for password hashing
- passport-jwt for jwt authentication

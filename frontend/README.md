## Frontend

### Files

- Please create a ".env.local" file in the src folder and add the following line: NEXT_PUBLIC_API_URL=http://localhost:3001/

Terminal: Run `npm run dev` to start the development server.

Below are the features and libraries used in the frontend:

### Features:

- An AxiosInstance file has been created to serve as an Axios helper, which automatically handles errors, includes the auth token in headers, and uses a base URL.
- The `src/components` directory is used to define components for the authentication and employee screens.

  - Employees:

    - "EmployeesHeader": Defines the header of the list.
    - "EmployeesModal": Renders a popup for editing/creating an employee.
    - "EmployeeSearchFilter": Renders an input field to search for employees in the database.
    - "EmployeesList": Renders the list of employees.
    - "EmployeesPagination": Renders the buttons used to navigate pages.

  - "AuthForm": Renders the Login/Register screen.

- Please register a new user to log in to the application, or use the credentials: zouheirhmaidan76@gmail.com, password: Ab7ss9x$

### Libraries:

- "Axios" is used for making API calls.
- "js-cookies" is used for storing the auth-token.
- "react-hot-toast" is used to render toasts.
- "sass" is used for styling.
- "lucide-react" is used for icons.

### Middleware

- `middleware.ts` ensures that the employees route is protected, preventing access if the user is not logged in (using JWT authentication).

### Notes:

- "JSDoc" comments were generated using Windsurf for better understanding of the components.
- "React.memo" and "useCallback" are used to prevent unnecessary re-renders.
- Animations are defined in SCSS files.
- The "types" folder declares types for employee-related fields.
- Employee pagination is limited to 4 by default.
- Debouncing is implemented to delay fetching data until there is a pause in input activity.

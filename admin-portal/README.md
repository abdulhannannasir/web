# Admin Portal

## Overview
The Admin Portal is a web application designed for user authentication and management. It provides functionalities for user registration and login, allowing administrators to manage user accounts effectively.

## Project Structure
```
admin-portal
├── src
│   ├── app.ts                # Entry point of the application
│   ├── controllers
│   │   └── authController.ts # Handles authentication logic
│   ├── routes
│   │   └── authRoutes.ts     # Defines authentication routes
│   ├── services
│   │   └── userService.ts     # Contains user-related services
│   ├── models
│   │   └── user.ts           # User schema definition
│   └── types
│       └── index.ts          # Type definitions
├── package.json               # npm configuration file
├── tsconfig.json              # TypeScript configuration file
└── README.md                  # Project documentation
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd admin-portal
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Start the application:
   ```
   npm start
   ```

## Usage
- To register a new user, send a POST request to `/api/auth/register` with the user's email and password.
- To log in, send a POST request to `/api/auth/login` with the user's email and password.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.
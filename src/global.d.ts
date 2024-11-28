import { User } from './users/users.entity'; // Adjust the import path to your User entity

declare global {
  namespace Express {
    interface Request {
      user?: User; // Add the user property
    }
  }
}

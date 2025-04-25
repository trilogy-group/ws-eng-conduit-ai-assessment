import { User } from './user/user.entity'; // adjust the path if needed

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
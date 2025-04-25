import { Request } from 'express';
import { User } from '../user/user.entity'; // Adjust path as needed

export interface RequestWithUser extends Request {
  user: User;
}
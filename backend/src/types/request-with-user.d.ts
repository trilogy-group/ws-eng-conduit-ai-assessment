import { Request } from 'express';
import { User } from '../user/user.entity'; // adjust path if needed

export interface RequestWithUser extends Request {
  user: User;
}
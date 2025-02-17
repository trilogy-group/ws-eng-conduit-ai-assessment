import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { SECRET } from '../config';
import { IUserData } from './user.interface';

export const User = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();

  // if route is protected, there is a user set in auth.middleware
  if (req.user) {
    return data ? req.user[data] : req.user;
  }

  // in case a route is not protected, we still want to get the optional auth user from jwt
  const token = req.headers?.authorization ? (req.headers.authorization as string).split(' ') : null;

  if (token?.[1]) {
    const decoded = jwt.verify(token[1], SECRET) as { user: IUserData };
    return data ? decoded[data as 'user'] : decoded.user;
  }
});

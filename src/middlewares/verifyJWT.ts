import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IAccessTokenPayload } from '../modules/auth/repositories/IAuthRepository';

function verifyJWT(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return response.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error) {
      return response.status(403).json({ message: 'Forbidden' });
    }
    request.user = (decoded as IAccessTokenPayload).userInfo.username;
    request.roles = (decoded as IAccessTokenPayload).userInfo.roles;
    next();
  });
}

export { verifyJWT };

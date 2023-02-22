import { Request, Response, NextFunction } from 'express';

import { logEvents } from '../utils/logEvents';

function logger(request: Request, response: Response, next: NextFunction) {
  const message = `${request.method}\t${request.url}\t${request.headers?.origin}`;
  logEvents(message, 'requestLog.log');

  console.log(`${request.method} ${request.path}`);
  next();
}

export { logger };

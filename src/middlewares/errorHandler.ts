import { Request, Response, NextFunction } from 'express';

import { logEvents } from '../utils/logEvents';

interface CustomError extends Error {
  status: number;
}

function errorHandler(
  error: CustomError,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const customError: CustomError = {
    name: error.name ?? 'Error',
    message: error.message ?? 'Something went wrong',
    status: error.status ?? 500,
  };

  logEvents(
    `${customError.name}: ${customError.message}\t${request.method}\t${request.url}\t${request.headers.origin}`,
    'errorLog.log'
  );
  console.log(error.stack);

  response.status(customError.status).json({ error: customError.message });

  next();
}

export { errorHandler };

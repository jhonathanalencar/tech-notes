import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

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
  let customError: CustomError = {
    name: error.name ?? 'Error',
    message: error.message ?? 'Something went wrong',
    status: error.status ?? 500,
  };

  if (error instanceof ZodError) {
    customError = {
      name: error.errors[0].code,
      message: error.errors[0].message,
      status: 400,
    };
  }

  logEvents(
    `${customError.name}: ${customError.message}\t${request.method}\t${request.url}\t${request.headers.origin}`,
    'errorLog.log'
  );
  console.log(error.stack);

  response
    .status(customError.status)
    .json({
      error: customError.message,
      ...(customError.status === 500 && { isError: true }),
    });

  next();
}

export { errorHandler };

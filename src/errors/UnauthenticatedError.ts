import { CustomError } from './CustomError';

class UnauthenticatedError extends CustomError {
  constructor(message: string) {
    super(message);
    this.status = 401;
  }
}

export { UnauthenticatedError };

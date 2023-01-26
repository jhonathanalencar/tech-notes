import { CustomError } from './CustomError';

class ConflictError extends CustomError {
  constructor(message: string) {
    super(message);
    this.status = 409;
  }
}

export { ConflictError };

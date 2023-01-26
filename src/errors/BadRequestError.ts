import { CustomError } from './CustomError';

class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message);
    this.status = 400;
  }
}

export { BadRequestError };

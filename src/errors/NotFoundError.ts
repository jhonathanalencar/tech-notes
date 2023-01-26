import { CustomError } from './CustomError';

class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message);
    this.status = 404;
  }
}

export { NotFoundError };

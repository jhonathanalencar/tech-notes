import { CustomError } from './CustomError';

class UnauthorizedError extends CustomError {
  constructor(message: string) {
    super(message);
    this.status = 403;
  }
}
export { UnauthorizedError };

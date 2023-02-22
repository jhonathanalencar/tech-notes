import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../../errors/CustomError';
import { errorHandler } from '../../middlewares';

describe('errorHandler middleware', () => {
  const error: CustomError = {
    name: 'error',
    message: 'string',
    status: 500,
  };
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should be able to handle error', async () => {
    errorHandler(
      error,
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: error.message,
      isError: true,
    });
    expect(nextFunction).not.toHaveBeenCalled();
  });
});

import { NextFunction, Request, Response } from 'express';

import { logger } from '../../middlewares';

describe('logger middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const nextFunction: NextFunction = jest.fn();

  const logSpy = jest.spyOn(console, 'log');

  beforeEach(() => {
    mockRequest = {
      method: 'GET',
      path: '/users',
    };
  });

  it('should be able to log the request', () => {
    logger(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(logSpy).toHaveBeenCalledWith(
      `${mockRequest.method} ${mockRequest.path}`
    );
    expect(nextFunction).toHaveBeenCalled();
  });
});

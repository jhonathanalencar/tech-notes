import { NextFunction, Request, Response } from 'express';

import { verifyJWT } from '../../middlewares';
import { Auth } from '../../modules/auth/model/Auth';

describe('verifyJWT middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const nextFunction: NextFunction = jest.fn();

  const accessToken = Auth.createJwt(
    {
      userInfo: {
        username: 'Alice',
        roles: ['Employee'],
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '15m',
    }
  );

  const expiredAccessToken = Auth.createJwt(
    {
      userInfo: {
        username: 'Alice',
        roles: ['Employee'],
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '0s',
    }
  );

  beforeEach(() => {
    mockRequest = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should be able to let user access the private resources with access token', () => {
    verifyJWT(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(nextFunction).toHaveBeenCalled();
  });

  it('should not be able to let user access the private resources without access token', () => {
    verifyJWT(
      { ...mockRequest, headers: { authorization: '' } } as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it('should not be able to let user access the private resources when access token is expired', () => {
    verifyJWT(
      {
        ...mockRequest,
        headers: { authorization: `Bearer ${expiredAccessToken}` },
      } as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Forbidden' });
    expect(nextFunction).not.toHaveBeenCalled();
  });
});

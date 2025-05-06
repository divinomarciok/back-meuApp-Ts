import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { authenticateToken } from '../../middleware/authenticateToken';

// Mock do JWT
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

describe('authenticateToken Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: jest.Mock;

  beforeEach(() => {
    mockRequest = {
      headers: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    nextFunction = jest.fn();
  });

  it('deve retornar erro 401 quando não há token de autorização', () => {
    // Execução do middleware
    authenticateToken(
      mockRequest as Request & { user?: string | jwt.JwtPayload },
      mockResponse as Response,
      nextFunction
    );

    // Verificações
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Token não fornecido' });
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it('deve retornar erro 403 quando o token é inválido', () => {
    // Configuração do mock
    mockRequest.headers = { authorization: 'Bearer invalid-token' };
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error('Token inválido');
    });

    // Execução do middleware
    authenticateToken(
      mockRequest as Request & { user?: string | jwt.JwtPayload },
      mockResponse as Response,
      nextFunction
    );

    // Verificações
    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Token inválido ou expirado' });
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it('deve chamar next() quando o token é válido', () => {
    // Configuração do mock
    mockRequest.headers = { authorization: 'Bearer valid-token' };
    const mockDecodedToken = { id: 1, email: 'test@example.com' };
    (jwt.verify as jest.Mock).mockReturnValue(mockDecodedToken);

    // Execução do middleware
    authenticateToken(
      mockRequest as Request & { user?: string | jwt.JwtPayload },
      mockResponse as Response,
      nextFunction
    );

    // Verificações
    expect(jwt.verify).toHaveBeenCalledWith('valid-token', expect.any(String));
    //expect(mockRequest.user).toEqual(mockDecodedToken);
    expect(nextFunction).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
  });
});
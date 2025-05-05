"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken_1 = require("../../middleware/authenticateToken");
// Mock do JWT
jest.mock('jsonwebtoken', () => ({
    verify: jest.fn(),
}));
describe('authenticateToken Middleware', () => {
    let mockRequest;
    let mockResponse;
    let nextFunction;
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
        (0, authenticateToken_1.authenticateToken)(mockRequest, mockResponse, nextFunction);
        // Verificações
        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Token não fornecido' });
        expect(nextFunction).not.toHaveBeenCalled();
    });
    it('deve retornar erro 403 quando o token é inválido', () => {
        // Configuração do mock
        mockRequest.headers = { authorization: 'Bearer invalid-token' };
        jsonwebtoken_1.default.verify.mockImplementation(() => {
            throw new Error('Token inválido');
        });
        // Execução do middleware
        (0, authenticateToken_1.authenticateToken)(mockRequest, mockResponse, nextFunction);
        // Verificações
        expect(mockResponse.status).toHaveBeenCalledWith(403);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Token inválido ou expirado' });
        expect(nextFunction).not.toHaveBeenCalled();
    });
    it('deve chamar next() quando o token é válido', () => {
        // Configuração do mock
        mockRequest.headers = { authorization: 'Bearer valid-token' };
        const mockDecodedToken = { id: 1, email: 'test@example.com' };
        jsonwebtoken_1.default.verify.mockReturnValue(mockDecodedToken);
        // Execução do middleware
        (0, authenticateToken_1.authenticateToken)(mockRequest, mockResponse, nextFunction);
        // Verificações
        expect(jsonwebtoken_1.default.verify).toHaveBeenCalledWith('valid-token', expect.any(String));
        //expect(mockRequest.user).toEqual(mockDecodedToken);
        expect(nextFunction).toHaveBeenCalled();
        expect(mockResponse.status).not.toHaveBeenCalled();
        expect(mockResponse.json).not.toHaveBeenCalled();
    });
});

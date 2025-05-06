"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../../controllers/user.controller");
const user_service_1 = require("../../service/user.service");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Mock do UserService
jest.mock('../../service/user.service');
// Mock do bcrypt
jest.mock('bcryptjs', () => ({
    hash: jest.fn().mockResolvedValue('hashed-password'),
}));
describe('UserController', () => {
    let userController;
    let mockRequest;
    let mockResponse;
    let mockUserService;
    beforeEach(() => {
        // Reset dos mocks
        jest.clearAllMocks();
        // Mock do UserService
        mockUserService = {
            createUser: jest.fn(),
            getUserById: jest.fn(),
            findUserByEmail: jest.fn(),
            findUserByLogin: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
            listUsers: jest.fn(),
        };
        // Substituir a instância do UserService no construtor
        user_service_1.UserService.mockImplementation(() => mockUserService);
        // Instanciar o controller
        userController = new user_controller_1.UserController();
        // Mock do Request e Response
        mockRequest = {
            body: {},
            params: {},
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };
    });
    describe('create', () => {
        it('deve criar um usuário com sucesso', () => __awaiter(void 0, void 0, void 0, function* () {
            // Dados de teste
            const userData = {
                nome: 'John Doe',
                email: 'john@example.com',
                login: 'johndoe',
                senha: '123456',
            };
            const createdUser = Object.assign({ id: 1 }, userData);
            // Configuração dos mocks
            mockRequest.body = userData;
            mockUserService.createUser.mockResolvedValue(createdUser);
            // Execução do método
            yield userController.create(mockRequest, mockResponse);
            // Verificações
            expect(mockUserService.createUser).toHaveBeenCalledWith(userData);
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith({
                id: 1,
                nome: 'John Doe',
                email: 'john@example.com',
                login: 'johndoe',
            });
        }));
        it('deve retornar erro 400 quando ocorre uma exceção', () => __awaiter(void 0, void 0, void 0, function* () {
            // Configuração dos mocks
            mockRequest.body = { nome: 'John Doe' };
            mockUserService.createUser.mockRejectedValue(new Error('Email já cadastrado'));
            // Execução do método
            yield userController.create(mockRequest, mockResponse);
            // Verificações
            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Email já cadastrado' });
        }));
    });
    describe('findById', () => {
        it('deve retornar um usuário pelo ID com sucesso', () => __awaiter(void 0, void 0, void 0, function* () {
            // Dados de teste
            const userId = 1;
            const user = {
                id: userId,
                nome: 'John Doe',
                email: 'john@example.com',
                login: 'johndoe',
                senha: 'hashed-password',
            };
            // Configuração dos mocks
            mockRequest.params = { id: userId.toString() };
            mockUserService.getUserById.mockResolvedValue(user);
            // Execução do método
            yield userController.findById(mockRequest, mockResponse);
            // Verificações
            expect(mockUserService.getUserById).toHaveBeenCalledWith(userId);
            expect(mockResponse.json).toHaveBeenCalledWith({
                id: userId,
                nome: 'John Doe',
                email: 'john@example.com',
                login: 'johndoe',
            });
        }));
        it('deve retornar erro 404 quando o usuário não existe', () => __awaiter(void 0, void 0, void 0, function* () {
            // Configuração dos mocks
            mockRequest.params = { id: '999' };
            mockUserService.getUserById.mockResolvedValue(null);
            // Execução do método
            yield userController.findById(mockRequest, mockResponse);
            // Verificações
            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Usuário não encontrado' });
        }));
        it('deve retornar erro 500 quando ocorre uma exceção', () => __awaiter(void 0, void 0, void 0, function* () {
            // Configuração dos mocks
            mockRequest.params = { id: '1' };
            mockUserService.getUserById.mockRejectedValue(new Error('Erro de banco de dados'));
            // Execução do método
            yield userController.findById(mockRequest, mockResponse);
            // Verificações
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro ao buscar usuário' });
        }));
    });
    describe('findByEmail', () => {
        it('deve retornar um usuário pelo email com sucesso', () => __awaiter(void 0, void 0, void 0, function* () {
            // Dados de teste
            const email = 'john@example.com';
            const user = {
                id: 1,
                nome: 'John Doe',
                email,
                login: 'johndoe',
                senha: 'hashed-password',
            };
            // Configuração dos mocks
            mockRequest.body = { email };
            mockUserService.findUserByEmail.mockResolvedValue(user);
            // Execução do método
            yield userController.findByEmail(mockRequest, mockResponse);
            // Verificações
            expect(mockUserService.findUserByEmail).toHaveBeenCalledWith(email);
            expect(mockResponse.json).toHaveBeenCalledWith({
                id: 1,
                nome: 'John Doe',
                email,
                login: 'johndoe',
            });
        }));
        it('deve retornar erro 400 quando o email não é fornecido', () => __awaiter(void 0, void 0, void 0, function* () {
            // Configuração dos mocks
            mockRequest.body = {};
            // Execução do método
            yield userController.findByEmail(mockRequest, mockResponse);
            // Verificações
            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'O campo email é obrigatório no corpo da requisição.'
            });
        }));
        it('deve retornar erro 404 quando o usuário não existe', () => __awaiter(void 0, void 0, void 0, function* () {
            // Configuração dos mocks
            mockRequest.body = { email: 'nonexistent@example.com' };
            mockUserService.findUserByEmail.mockResolvedValue(null);
            // Execução do método
            yield userController.findByEmail(mockRequest, mockResponse);
            // Verificações
            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Usuário não encontrado' });
        }));
    });
    describe('findByLogin', () => {
        it('deve retornar um usuário pelo login com sucesso', () => __awaiter(void 0, void 0, void 0, function* () {
            // Dados de teste
            const login = 'johndoe';
            const user = {
                id: 1,
                nome: 'John Doe',
                email: 'john@example.com',
                login,
                senha: 'hashed-password',
            };
            // Configuração dos mocks
            mockRequest.body = { login };
            mockUserService.findUserByLogin.mockResolvedValue(user);
            // Execução do método
            yield userController.findByLogin(mockRequest, mockResponse);
            // Verificações
            expect(mockUserService.findUserByLogin).toHaveBeenCalledWith(login);
            expect(mockResponse.json).toHaveBeenCalledWith(user); // Retorna o usuário completo com senha
        }));
        it('deve retornar erro 400 quando o login não é fornecido', () => __awaiter(void 0, void 0, void 0, function* () {
            // Configuração dos mocks
            mockRequest.body = {};
            // Execução do método
            yield userController.findByLogin(mockRequest, mockResponse);
            // Verificações
            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'O campo login é obrigatório no corpo da requisição.'
            });
        }));
        it('deve retornar erro 404 quando o usuário não existe', () => __awaiter(void 0, void 0, void 0, function* () {
            // Configuração dos mocks
            mockRequest.body = { login: 'nonexistent' };
            mockUserService.findUserByLogin.mockResolvedValue(null);
            // Execução do método
            yield userController.findByLogin(mockRequest, mockResponse);
            // Verificações
            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Usuário não encontrado' });
        }));
    });
    describe('update', () => {
        it('deve atualizar um usuário com sucesso', () => __awaiter(void 0, void 0, void 0, function* () {
            // Dados de teste
            const userId = 1;
            const updateData = {
                nome: 'John Updated',
                senha: 'new-password',
                email: 'updated@example.com',
            };
            const updatedUser = {
                id: userId,
                nome: 'John Updated',
                email: 'updated@example.com',
                login: 'johndoe',
                senha: 'hashed-password',
            };
            // Configuração dos mocks
            mockRequest.params = { id: userId.toString() };
            mockRequest.body = updateData;
            mockUserService.updateUser.mockResolvedValue(updatedUser);
            // Execução do método
            yield userController.update(mockRequest, mockResponse);
            // Verificações
            expect(bcryptjs_1.default.hash).toHaveBeenCalledWith('new-password', 10);
            expect(mockUserService.updateUser).toHaveBeenCalledWith(userId, {
                nome: 'John Updated',
                senha: 'hashed-password',
                email: 'updated@example.com',
            });
            expect(mockResponse.json).toHaveBeenCalledWith({
                id: userId,
                nome: 'John Updated',
                email: 'updated@example.com',
                login: 'johndoe',
            });
        }));
        it('deve retornar erro 404 quando o usuário não existe', () => __awaiter(void 0, void 0, void 0, function* () {
            // Configuração dos mocks
            mockRequest.params = { id: '999' };
            mockRequest.body = { nome: 'John Updated' };
            mockUserService.updateUser.mockResolvedValue(null);
            // Execução do método
            yield userController.update(mockRequest, mockResponse);
            // Verificações
            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Usuário não encontrado' });
        }));
        it('deve retornar erro 400 quando ocorre uma exceção', () => __awaiter(void 0, void 0, void 0, function* () {
            // Configuração dos mocks
            mockRequest.params = { id: '1' };
            mockRequest.body = { email: 'existing@example.com' };
            mockUserService.updateUser.mockRejectedValue(new Error('Email já cadastrado'));
            // Execução do método
            yield userController.update(mockRequest, mockResponse);
            // Verificações
            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Email já cadastrado' });
        }));
    });
    describe('delete', () => {
        it('deve deletar um usuário com sucesso', () => __awaiter(void 0, void 0, void 0, function* () {
            // Configuração dos mocks
            mockRequest.params = { id: '1' };
            mockUserService.deleteUser.mockResolvedValue(true);
            // Execução do método
            yield userController.delete(mockRequest, mockResponse);
            // Verificações
            expect(mockUserService.deleteUser).toHaveBeenCalledWith(1);
            expect(mockResponse.status).toHaveBeenCalledWith(204);
            expect(mockResponse.send).toHaveBeenCalled();
        }));
        it('deve retornar erro 404 quando o usuário não existe', () => __awaiter(void 0, void 0, void 0, function* () {
            // Configuração dos mocks
            mockRequest.params = { id: '999' };
            mockUserService.deleteUser.mockResolvedValue(false);
            // Execução do método
            yield userController.delete(mockRequest, mockResponse);
            // Verificações
            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Usuário não encontrado' });
        }));
        it('deve retornar erro 500 quando ocorre uma exceção', () => __awaiter(void 0, void 0, void 0, function* () {
            // Configuração dos mocks
            mockRequest.params = { id: '1' };
            mockUserService.deleteUser.mockRejectedValue(new Error('Erro ao deletar usuário'));
            // Execução do método
            yield userController.delete(mockRequest, mockResponse);
            // Verificações
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro ao deletar usuário' });
        }));
    });
    describe('list', () => {
        it('deve listar todos os usuários com sucesso', () => __awaiter(void 0, void 0, void 0, function* () {
            // Dados de teste
            const users = [
                {
                    id: 1,
                    nome: 'John Doe',
                    email: 'john@example.com',
                    login: 'johndoe',
                    senha: 'hashed-password',
                },
                {
                    id: 2,
                    nome: 'Jane Doe',
                    email: 'jane@example.com',
                    login: 'janedoe',
                    senha: 'hashed-password',
                },
            ];
            // Configuração dos mocks
            mockUserService.listUsers.mockResolvedValue(users);
            // Execução do método
            yield userController.list(mockRequest, mockResponse);
            // Verificações
            expect(mockUserService.listUsers).toHaveBeenCalled();
            expect(mockResponse.json).toHaveBeenCalledWith([
                {
                    id: 1,
                    nome: 'John Doe',
                    email: 'john@example.com',
                    login: 'johndoe',
                },
                {
                    id: 2,
                    nome: 'Jane Doe',
                    email: 'jane@example.com',
                    login: 'janedoe',
                },
            ]);
        }));
        it('deve retornar erro 500 quando ocorre uma exceção', () => __awaiter(void 0, void 0, void 0, function* () {
            // Configuração dos mocks
            mockUserService.listUsers.mockRejectedValue(new Error('Erro ao listar'));
            // Execução do método
            yield userController.list(mockRequest, mockResponse);
            // Verificações
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro ao listar usuários' });
        }));
    });
});

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
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
// Mock do UserService - importante fazer isso antes de importar as rotas
const mockCreateUser = jest.fn();
const mockGetUserById = jest.fn();
const mockFindUserByEmail = jest.fn();
const mockFindUserByLogin = jest.fn();
const mockUpdateUser = jest.fn();
const mockDeleteUser = jest.fn();
const mockListUsers = jest.fn();
// Mock do UserService
jest.mock('../../service/user.service', () => {
    return {
        UserService: jest.fn().mockImplementation(() => {
            return {
                createUser: mockCreateUser,
                getUserById: mockGetUserById,
                findUserByEmail: mockFindUserByEmail,
                findUserByLogin: mockFindUserByLogin,
                updateUser: mockUpdateUser,
                deleteUser: mockDeleteUser,
                listUsers: mockListUsers
            };
        })
    };
});
// Mock do JWT
jest.mock('jsonwebtoken', () => ({
    verify: jest.fn().mockReturnValue({ id: 1, email: 'test@example.com' }),
    sign: jest.fn().mockReturnValue('mocked-token')
}));
// Importar as rotas depois de configurar os mocks
const user_routes_1 = require("../../routes/user.routes");
// Configuração do app Express para testes
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', user_routes_1.userRoutes);
describe('User Routes', () => {
    const mockUser = {
        id: 1,
        nome: 'John Doe',
        email: 'johndoe@example.com',
        login: 'johndoe',
        senha: 'hashedpassword123',
    };
    const mockUserWithoutSenha = {
        id: 1,
        nome: 'John Doe',
        email: 'johndoe@example.com',
        login: 'johndoe',
    };
    const mockUserInput = {
        nome: 'John Doe',
        email: 'johndoe@example.com',
        login: 'johndoe',
        senha: '123456',
    };
    // Token de autenticação para testes
    const mockToken = 'Bearer fake-jwt-token';
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('POST /api/users - Create User', () => {
        it('deve criar um usuário com sucesso', () => __awaiter(void 0, void 0, void 0, function* () {
            // Configuração do mock
            mockCreateUser.mockResolvedValue(mockUser);
            // Execução do teste
            const response = yield (0, supertest_1.default)(app)
                .post('/api/users')
                .send(mockUserInput);
            // Verificações
            expect(response.status).toBe(201);
            expect(response.body).toEqual(mockUserWithoutSenha);
            expect(mockCreateUser).toHaveBeenCalled();
        }));
        it('deve retornar erro 400 quando o email já existe', () => __awaiter(void 0, void 0, void 0, function* () {
            // Configuração do mock
            mockCreateUser.mockRejectedValue(new Error('Email já cadastrado'));
            // Execução do teste
            const response = yield (0, supertest_1.default)(app)
                .post('/api/users')
                .send(mockUserInput);
            // Verificações
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message', 'Email já cadastrado');
            expect(mockCreateUser).toHaveBeenCalled();
        }));
    });
    describe('GET /api/users - List Users', () => {
        it('deve listar todos os usuários com sucesso', () => __awaiter(void 0, void 0, void 0, function* () {
            // Configuração do mock
            mockListUsers.mockResolvedValue([mockUser, Object.assign(Object.assign({}, mockUser), { id: 2, email: 'jane@example.com' })]);
            // Execução do teste
            const response = yield (0, supertest_1.default)(app)
                .get('/api/users')
                .set('Authorization', mockToken);
            // Verificações
            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(2);
            expect(response.body[0]).not.toHaveProperty('senha');
            expect(mockListUsers).toHaveBeenCalled();
        }));
        it('deve retornar erro 401 quando não há token de autenticação', () => __awaiter(void 0, void 0, void 0, function* () {
            // Execução do teste
            const response = yield (0, supertest_1.default)(app).get('/api/users');
            // Verificações
            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('message', 'Token não fornecido');
        }));
    });
    describe('GET /api/users/:id - Find User By ID', () => {
        it('deve retornar um usuário pelo ID com sucesso', () => __awaiter(void 0, void 0, void 0, function* () {
            // Configuração do mock
            mockGetUserById.mockResolvedValue(mockUser);
            // Execução do teste
            const response = yield (0, supertest_1.default)(app)
                .get('/api/users/1')
                .set('Authorization', mockToken);
            // Verificações
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUserWithoutSenha);
            expect(mockGetUserById).toHaveBeenCalled();
        }));
        it('deve retornar erro 404 quando o usuário não existe', () => __awaiter(void 0, void 0, void 0, function* () {
            // Configuração do mock
            mockGetUserById.mockResolvedValue(null);
            // Execução do teste
            const response = yield (0, supertest_1.default)(app)
                .get('/api/users/999')
                .set('Authorization', mockToken);
            // Verificações
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('message', 'Usuário não encontrado');
            expect(mockGetUserById).toHaveBeenCalled();
        }));
    });
    describe('POST /api/users/email/ - Find User By Email', () => {
        it('deve retornar um usuário pelo email com sucesso', () => __awaiter(void 0, void 0, void 0, function* () {
            // Configuração do mock
            mockFindUserByEmail.mockResolvedValue(mockUser);
            // Execução do teste
            const response = yield (0, supertest_1.default)(app)
                .post('/api/users/email/')
                .set('Authorization', mockToken)
                .send({ email: 'johndoe@example.com' });
            // Verificações
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUserWithoutSenha);
            expect(mockFindUserByEmail).toHaveBeenCalled();
        }));
        it('deve retornar erro 400 quando o email não é fornecido', () => __awaiter(void 0, void 0, void 0, function* () {
            // Execução do teste
            const response = yield (0, supertest_1.default)(app)
                .post('/api/users/email/')
                .set('Authorization', mockToken)
                .send({});
            // Verificações
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message', 'O campo email é obrigatório no corpo da requisição.');
        }));
        it('deve retornar erro 404 quando o usuário não existe', () => __awaiter(void 0, void 0, void 0, function* () {
            // Configuração do mock
            mockFindUserByEmail.mockResolvedValue(null);
            // Execução do teste
            const response = yield (0, supertest_1.default)(app)
                .post('/api/users/email/')
                .set('Authorization', mockToken)
                .send({ email: 'nonexistent@example.com' });
            // Verificações
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('message', 'Usuário não encontrado');
            expect(mockFindUserByEmail).toHaveBeenCalled();
        }));
    });
    describe('POST /api/users/login/ - Find User By Login', () => {
        it('deve retornar um usuário pelo login com sucesso', () => __awaiter(void 0, void 0, void 0, function* () {
            // Configuração do mock
            mockFindUserByLogin.mockResolvedValue(mockUser);
            // Execução do teste
            const response = yield (0, supertest_1.default)(app)
                .post('/api/users/login/')
                .send({ login: 'johndoe' });
            // Verificações
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUser); // Neste caso, retorna o usuário completo com senha
            expect(mockFindUserByLogin).toHaveBeenCalled();
        }));
        it('deve retornar erro 400 quando o login não é fornecido', () => __awaiter(void 0, void 0, void 0, function* () {
            // Execução do teste
            const response = yield (0, supertest_1.default)(app)
                .post('/api/users/login/')
                .send({});
            // Verificações
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('message', 'O campo login é obrigatório no corpo da requisição.');
        }));
        it('deve retornar erro 404 quando o usuário não existe', () => __awaiter(void 0, void 0, void 0, function* () {
            // Configuração do mock
            mockFindUserByLogin.mockResolvedValue(null);
            // Execução do teste
            const response = yield (0, supertest_1.default)(app)
                .post('/api/users/login/')
                .send({ login: 'nonexistent' });
            // Verificações
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('message', 'Usuário não encontrado');
            expect(mockFindUserByLogin).toHaveBeenCalled();
        }));
    });
    describe('PUT /api/users/:id - Update User', () => {
        it('deve atualizar um usuário com sucesso', () => __awaiter(void 0, void 0, void 0, function* () {
            // Dados para atualização
            const updateData = { nome: 'John Updated' };
            const updatedUser = Object.assign(Object.assign({}, mockUser), { nome: 'John Updated' });
            const updatedUserWithoutSenha = Object.assign(Object.assign({}, mockUserWithoutSenha), { nome: 'John Updated' });
            // Configuração do mock
            mockUpdateUser.mockResolvedValue(updatedUser);
            // Execução do teste
            const response = yield (0, supertest_1.default)(app)
                .put('/api/users/1')
                .set('Authorization', mockToken)
                .send(updateData);
            // Verificações
            expect(response.status).toBe(200);
            expect(response.body).toEqual(updatedUserWithoutSenha);
            expect(mockUpdateUser).toHaveBeenCalled();
        }));
        it('deve retornar erro 404 quando o usuário não existe', () => __awaiter(void 0, void 0, void 0, function* () {
            // Configuração do mock
            mockUpdateUser.mockResolvedValue(null);
            // Execução do teste
            const response = yield (0, supertest_1.default)(app)
                .put('/api/users/999')
                .set('Authorization', mockToken)
                .send({ nome: 'John Updated' });
            // Verificações
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('message', 'Usuário não encontrado');
            expect(mockUpdateUser).toHaveBeenCalled();
        }));
    });
    describe('DELETE /api/users/:id - Delete User', () => {
        it('deve deletar um usuário com sucesso', () => __awaiter(void 0, void 0, void 0, function* () {
            // Configuração do mock
            mockDeleteUser.mockResolvedValue(true);
            // Execução do teste
            const response = yield (0, supertest_1.default)(app)
                .delete('/api/users/1')
                .set('Authorization', mockToken);
            // Verificações
            expect(response.status).toBe(204);
            expect(mockDeleteUser).toHaveBeenCalled();
        }));
        it('deve retornar erro 404 quando o usuário não existe', () => __awaiter(void 0, void 0, void 0, function* () {
            // Configuração do mock
            mockDeleteUser.mockResolvedValue(false);
            // Execução do teste
            const response = yield (0, supertest_1.default)(app)
                .delete('/api/users/999')
                .set('Authorization', mockToken);
            // Verificações
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('message', 'Usuário não encontrado');
            expect(mockDeleteUser).toHaveBeenCalled();
        }));
    });
});

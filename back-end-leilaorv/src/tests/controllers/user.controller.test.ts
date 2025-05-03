import { Request, Response } from 'express';
import { UserController } from '../../controllers/user.controller';
import { UserService } from '../../service/user.service';
import bcrypt from 'bcryptjs';

// Mock do UserService
jest.mock('../../service/user.service');
 
// Mock do bcrypt
jest.mock('bcryptjs', () => ({
  hash: jest.fn().mockResolvedValue('hashed-password'),
}));

describe('UserController', () => {
  let userController: UserController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockUserService: jest.Mocked<UserService>;

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
    } as unknown as jest.Mocked<UserService>;

    // Substituir a instância do UserService no construtor
    (UserService as jest.Mock).mockImplementation(() => mockUserService);

    // Instanciar o controller
    userController = new UserController();

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
    it('deve criar um usuário com sucesso', async () => {
      // Dados de teste
      const userData = {
        nome: 'John Doe',
        email: 'john@example.com',
        login: 'johndoe',
        senha: '123456',
      };
      const createdUser = {
        id: 1,
        ...userData,
      };

      // Configuração dos mocks
      mockRequest.body = userData;
      mockUserService.createUser.mockResolvedValue(createdUser);

      // Execução do método
      await userController.create(mockRequest as Request, mockResponse as Response);

      // Verificações
      expect(mockUserService.createUser).toHaveBeenCalledWith(userData);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        id: 1,
        nome: 'John Doe',
        email: 'john@example.com',
        login: 'johndoe',
      });
    });

    it('deve retornar erro 400 quando ocorre uma exceção', async () => {
      // Configuração dos mocks
      mockRequest.body = { nome: 'John Doe' };
      mockUserService.createUser.mockRejectedValue(new Error('Email já cadastrado'));

      // Execução do método
      await userController.create(mockRequest as Request, mockResponse as Response);

      // Verificações
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Email já cadastrado' });
    });
  });

  describe('findById', () => {
    it('deve retornar um usuário pelo ID com sucesso', async () => {
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
      await userController.findById(mockRequest as Request, mockResponse as Response);

      // Verificações
      expect(mockUserService.getUserById).toHaveBeenCalledWith(userId);
      expect(mockResponse.json).toHaveBeenCalledWith({
        id: userId,
        nome: 'John Doe',
        email: 'john@example.com',
        login: 'johndoe',
      });
    });

    it('deve retornar erro 404 quando o usuário não existe', async () => {
      // Configuração dos mocks
      mockRequest.params = { id: '999' };
      mockUserService.getUserById.mockResolvedValue(null);

      // Execução do método
      await userController.findById(mockRequest as Request, mockResponse as Response);

      // Verificações
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Usuário não encontrado' });
    });

    it('deve retornar erro 500 quando ocorre uma exceção', async () => {
      // Configuração dos mocks
      mockRequest.params = { id: '1' };
      mockUserService.getUserById.mockRejectedValue(new Error('Erro de banco de dados'));

      // Execução do método
      await userController.findById(mockRequest as Request, mockResponse as Response);

      // Verificações
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro ao buscar usuário' });
    });
  });

  describe('findByEmail', () => {
    it('deve retornar um usuário pelo email com sucesso', async () => {
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
      await userController.findByEmail(mockRequest as Request, mockResponse as Response);

      // Verificações
      expect(mockUserService.findUserByEmail).toHaveBeenCalledWith(email);
      expect(mockResponse.json).toHaveBeenCalledWith({
        id: 1,
        nome: 'John Doe',
        email,
        login: 'johndoe',
      });
    });

    it('deve retornar erro 400 quando o email não é fornecido', async () => {
      // Configuração dos mocks
      mockRequest.body = {};

      // Execução do método
      await userController.findByEmail(mockRequest as Request, mockResponse as Response);

      // Verificações
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ 
        message: 'O campo email é obrigatório no corpo da requisição.' 
      });
    });

    it('deve retornar erro 404 quando o usuário não existe', async () => {
      // Configuração dos mocks
      mockRequest.body = { email: 'nonexistent@example.com' };
      mockUserService.findUserByEmail.mockResolvedValue(null);

      // Execução do método
      await userController.findByEmail(mockRequest as Request, mockResponse as Response);

      // Verificações
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Usuário não encontrado' });
    });
  });

  describe('findByLogin', () => {
    it('deve retornar um usuário pelo login com sucesso', async () => {
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
      await userController.findByLogin(mockRequest as Request, mockResponse as Response);

      // Verificações
      expect(mockUserService.findUserByLogin).toHaveBeenCalledWith(login);
      expect(mockResponse.json).toHaveBeenCalledWith(user); // Retorna o usuário completo com senha
    });

    it('deve retornar erro 400 quando o login não é fornecido', async () => {
      // Configuração dos mocks
      mockRequest.body = {};

      // Execução do método
      await userController.findByLogin(mockRequest as Request, mockResponse as Response);

      // Verificações
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ 
        message: 'O campo login é obrigatório no corpo da requisição.' 
      });
    });

    it('deve retornar erro 404 quando o usuário não existe', async () => {
      // Configuração dos mocks
      mockRequest.body = { login: 'nonexistent' };
      mockUserService.findUserByLogin.mockResolvedValue(null);

      // Execução do método
      await userController.findByLogin(mockRequest as Request, mockResponse as Response);

      // Verificações
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Usuário não encontrado' });
    });
  });

  describe('update', () => {
    it('deve atualizar um usuário com sucesso', async () => {
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
      await userController.update(mockRequest as Request, mockResponse as Response);

      // Verificações
      expect(bcrypt.hash).toHaveBeenCalledWith('new-password', 10);
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
    });

    it('deve retornar erro 404 quando o usuário não existe', async () => {
      // Configuração dos mocks
      mockRequest.params = { id: '999' };
      mockRequest.body = { nome: 'John Updated' };
      mockUserService.updateUser.mockResolvedValue(null);

      // Execução do método
      await userController.update(mockRequest as Request, mockResponse as Response);

      // Verificações
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Usuário não encontrado' });
    });

    it('deve retornar erro 400 quando ocorre uma exceção', async () => {
      // Configuração dos mocks
      mockRequest.params = { id: '1' };
      mockRequest.body = { email: 'existing@example.com' };
      mockUserService.updateUser.mockRejectedValue(new Error('Email já cadastrado'));

      // Execução do método
      await userController.update(mockRequest as Request, mockResponse as Response);

      // Verificações
      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Email já cadastrado' });
    });
  });

  describe('delete', () => {
    it('deve deletar um usuário com sucesso', async () => {
      // Configuração dos mocks
      mockRequest.params = { id: '1' };
      mockUserService.deleteUser.mockResolvedValue(true);

      // Execução do método
      await userController.delete(mockRequest as Request, mockResponse as Response);

      // Verificações
      expect(mockUserService.deleteUser).toHaveBeenCalledWith(1);
      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.send).toHaveBeenCalled();
    });

    it('deve retornar erro 404 quando o usuário não existe', async () => {
      // Configuração dos mocks
      mockRequest.params = { id: '999' };
      mockUserService.deleteUser.mockResolvedValue(false);

      // Execução do método
      await userController.delete(mockRequest as Request, mockResponse as Response);

      // Verificações
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Usuário não encontrado' });
    });

    it('deve retornar erro 500 quando ocorre uma exceção', async () => {
      // Configuração dos mocks
      mockRequest.params = { id: '1' };
      mockUserService.deleteUser.mockRejectedValue(new Error('Erro ao deletar usuário'));

      // Execução do método
      await userController.delete(mockRequest as Request, mockResponse as Response);

      // Verificações
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro ao deletar usuário' });
    });
  });

  describe('list', () => {
    it('deve listar todos os usuários com sucesso', async () => {
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
      await userController.list(mockRequest as Request, mockResponse as Response);

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
    });

    it('deve retornar erro 500 quando ocorre uma exceção', async () => {
      // Configuração dos mocks
      mockUserService.listUsers.mockRejectedValue(new Error('Erro ao listar'));

      // Execução do método
      await userController.list(mockRequest as Request, mockResponse as Response);

      // Verificações
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro ao listar usuários' });
    });
  });
});
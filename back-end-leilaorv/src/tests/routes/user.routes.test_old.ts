import request from 'supertest';
import express from 'express';
import { User } from '../../models/user';
import jwt from 'jsonwebtoken';

// Mock do JWT
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn().mockReturnValue({ id: 1, email: 'test@example.com' }),
  sign: jest.fn().mockReturnValue('mocked-token')
}));

// Mock do UserService
jest.mock('../../service/user.service', () => {
  return {
    UserService: jest.fn().mockImplementation(() => ({
      createUser: jest.fn(),
      getUserById: jest.fn(),
      findUserByEmail: jest.fn(),
      findUserByLogin: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
      listUsers: jest.fn(),
    }))
  };
});

// Mock do AppDataSource - IMPORTANTE: Deve vir antes de importar userRoutes
jest.mock('../../config/db.datasource', () => ({
  AppDataSource: {
    getRepository: jest.fn().mockImplementation((entity) => {
      if (entity === User) {
        return {
          findOne: jest.fn(),
          create: jest.fn(),
          save: jest.fn(),
          find: jest.fn(),
          update: jest.fn(),
          delete: jest.fn(),
        };
      }
      return {};
    }),
    initialize: jest.fn(),
  },
}));

// Agora importamos as dependências que usam os mocks
import { AppDataSource } from '../../config/db.datasource';
import { userRoutes } from '../../routes/user.routes';

// Configuração do app Express para testes
const app = express();
app.use(express.json());
app.use('/api', userRoutes);

describe('User Routes', () => {
  // Dados de teste
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
    
    it('deve criar um usuário com sucesso', async () => {
      // Mock do repositório
      
      const mockCreate = AppDataSource.getRepository(User).create as jest.Mock;
      const mockSave = AppDataSource.getRepository(User).save as jest.Mock;
      const mockFindOne = AppDataSource.getRepository(User).findOne as jest.Mock;

      // Configuração dos mocks
      mockFindOne.mockResolvedValue(null); // Não existe usuário com esse email
      mockCreate.mockReturnValue(mockUserInput);
      mockSave.mockResolvedValue(mockUser);

      // Mock do UserService.createUser
     // const userServiceMock = require('../../service/user.service').UserService.mock.instances[0];
    //  userServiceMock.createUser.mockResolvedValue(mockUser);

      // Execução do teste
      const response = await request(app)
        .post('/api/users')
        .send(mockUserInput);

      // Verificações
      //expect(response.status).toBe(201);
      expect(mockCreate).toHaveBeenCalled();
     // expect(response.body).toEqual(mockUserWithoutSenha);
     // expect(userServiceMock.createUser).toHaveBeenCalled();
    });
  });
});
    /*it('deve retornar erro 400 quando o email já existe', async () => {
      // Mock do UserService
      const userServiceMock = require('../../service/user.service').UserService.mock.instances[0];
      userServiceMock.createUser.mockRejectedValue(new Error('Email já cadastrado'));

      // Execução do teste
      const response = await request(app)
        .post('/api/users')
        .send(mockUserInput);

      // Verificações
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Email já cadastrado');
      expect(userServiceMock.createUser).toHaveBeenCalled();
    });
  });

  describe('GET /api/users - List Users', () => {
    it('deve listar todos os usuários com sucesso', async () => {
      // Mock do UserService
      const userServiceMock = require('../../service/user.service').UserService.mock.instances[0];
      userServiceMock.listUsers.mockResolvedValue([mockUser, { ...mockUser, id: 2, email: 'jane@example.com' }]);

      // Execução do teste
      const response = await request(app)
        .get('/api/users')
        .set('Authorization', mockToken);

      // Verificações
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).not.toHaveProperty('senha');
      expect(userServiceMock.listUsers).toHaveBeenCalled();
    });

    it('deve retornar erro 401 quando não há token de autenticação', async () => {
      // Execução do teste
      const response = await request(app).get('/api/users');

      // Verificações
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message', 'Token não fornecido');
    });
  });

  describe('GET /api/users/:id - Find User By ID', () => {
    it('deve retornar um usuário pelo ID com sucesso', async () => {
      // Mock do UserService
      const userServiceMock = require('../../service/user.service').UserService.mock.instances[0];
      userServiceMock.getUserById.mockResolvedValue(mockUser);

      // Execução do teste
      const response = await request(app)
        .get('/api/users/1')
        .set('Authorization', mockToken);

      // Verificações
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUserWithoutSenha);
      expect(userServiceMock.getUserById).toHaveBeenCalled();
    });

    it('deve retornar erro 404 quando o usuário não existe', async () => {
      // Mock do UserService
      const userServiceMock = require('../../service/user.service').UserService.mock.instances[0];
      userServiceMock.getUserById.mockResolvedValue(null);

      // Execução do teste
      const response = await request(app)
        .get('/api/users/999')
        .set('Authorization', mockToken);

      // Verificações
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Usuário não encontrado');
      expect(userServiceMock.getUserById).toHaveBeenCalled();
    });
  });

  describe('POST /api/users/email/ - Find User By Email', () => {
    it('deve retornar um usuário pelo email com sucesso', async () => {
      // Mock do UserService
      const userServiceMock = require('../../service/user.service').UserService.mock.instances[0];
      userServiceMock.findUserByEmail.mockResolvedValue(mockUser);

      // Execução do teste
      const response = await request(app)
        .post('/api/users/email/')
        .set('Authorization', mockToken)
        .send({ email: 'johndoe@example.com' });

      // Verificações
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUserWithoutSenha);
      expect(userServiceMock.findUserByEmail).toHaveBeenCalled();
    });

    it('deve retornar erro 400 quando o email não é fornecido', async () => {
      // Execução do teste
      const response = await request(app)
        .post('/api/users/email/')
        .set('Authorization', mockToken)
        .send({});

      // Verificações
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'O campo email é obrigatório no corpo da requisição.');
    });

    it('deve retornar erro 404 quando o usuário não existe', async () => {
      // Mock do UserService
      const userServiceMock = require('../../service/user.service').UserService.mock.instances[0];
      userServiceMock.findUserByEmail.mockResolvedValue(null);

      // Execução do teste
      const response = await request(app)
        .post('/api/users/email/')
        .set('Authorization', mockToken)
        .send({ email: 'nonexistent@example.com' });

      // Verificações
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Usuário não encontrado');
      expect(userServiceMock.findUserByEmail).toHaveBeenCalled();
    });
  });

  describe('POST /api/users/login/ - Find User By Login', () => {
    it('deve retornar um usuário pelo login com sucesso', async () => {
      // Mock do UserService
      const userServiceMock = require('../../service/user.service').UserService.mock.instances[0];
      userServiceMock.findUserByLogin.mockResolvedValue(mockUser);

      // Execução do teste
      const response = await request(app)
        .post('/api/users/login/')
        .send({ login: 'johndoe' });

      // Verificações
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUser); // Neste caso, retorna o usuário completo com senha
      expect(userServiceMock.findUserByLogin).toHaveBeenCalled();
    });

    it('deve retornar erro 400 quando o login não é fornecido', async () => {
      // Execução do teste
      const response = await request(app)
        .post('/api/users/login/')
        .send({});

      // Verificações
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'O campo login é obrigatório no corpo da requisição.');
    });

    it('deve retornar erro 404 quando o usuário não existe', async () => {
      // Mock do UserService
      const userServiceMock = require('../../service/user.service').UserService.mock.instances[0];
      userServiceMock.findUserByLogin.mockResolvedValue(null);

      // Execução do teste
      const response = await request(app)
        .post('/api/users/login/')
        .send({ login: 'nonexistent' });

      // Verificações
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Usuário não encontrado');
      expect(userServiceMock.findUserByLogin).toHaveBeenCalled();
    });
  });

  describe('PUT /api/users/:id - Update User', () => {
    it('deve atualizar um usuário com sucesso', async () => {
      // Dados de atualização
      const updateData = { nome: 'John Updated' };
      const updatedUser = { ...mockUser, nome: 'John Updated' };
      const updatedUserWithoutSenha = { ...mockUserWithoutSenha, nome: 'John Updated' };
      
      // Mock do UserService
      const userServiceMock = require('../../service/user.service').UserService.mock.instances[0];
      userServiceMock.updateUser.mockResolvedValue(updatedUser);

      // Execução do teste
      const response = await request(app)
        .put('/api/users/1')
        .set('Authorization', mockToken)
        .send(updateData);

      // Verificações
      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedUserWithoutSenha);
      expect(userServiceMock.updateUser).toHaveBeenCalled();
    });

    it('deve retornar erro 404 quando o usuário não existe', async () => {
      // Mock do UserService
      const userServiceMock = require('../../service/user.service').UserService.mock.instances[0];
      userServiceMock.updateUser.mockRejectedValue(new Error('Usuário não encontrado'));

      // Execução do teste
      const response = await request(app)
        .put('/api/users/999')
        .set('Authorization', mockToken)
        .send({ nome: 'John Updated' });

      // Verificações
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Usuário não encontrado');
      expect(userServiceMock.updateUser).toHaveBeenCalled();
    });
  });

  describe('DELETE /api/users/:id - Delete User', () => {
    it('deve deletar um usuário com sucesso', async () => {
      // Mock do repositório
      const mockFindOne = AppDataSource.getRepository(User).findOne as jest.Mock;
      const mockDelete = AppDataSource.getRepository(User).delete as jest.Mock;
      
      // Configuração dos mocks
      mockFindOne.mockResolvedValue(mockUser);
      mockDelete.mockResolvedValue({ affected: 1 });

      // Execução do teste
      const response = await request(app)
        .delete('/api/users/1')
        .set('Authorization', mockToken);

      // Verificações
      expect(response.status).toBe(204);
      expect(mockFindOne).toHaveBeenCalled();
      expect(mockDelete).toHaveBeenCalled();
    });

    it('deve retornar erro 404 quando o usuário não existe', async () => {
      // Mock do repositório
      const mockFindOne = AppDataSource.getRepository(User).findOne as jest.Mock;
      
      // Configuração dos mocks
      mockFindOne.mockResolvedValue(null);

      // Execução do teste
      const response = await request(app)
        .delete('/api/users/999')
        .set('Authorization', mockToken);

      // Verificações
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Usuário não encontrado');
      expect(mockFindOne).toHaveBeenCalled();
    });
  });
});*/
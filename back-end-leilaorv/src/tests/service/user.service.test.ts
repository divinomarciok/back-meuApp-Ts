import { UserService } from '../../service/user.service';
import { UserRepository } from '../../repositories/user.respository';
import { User } from '../../models/user';

// Mock do UserRepository
jest.mock('../../repositories/user.respository');

describe('UserService', () => {
  let userService: UserService;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    // Reset dos mocks
    jest.clearAllMocks();

    // Mock do UserRepository
    mockUserRepository = {
      create: jest.fn(),
      findByid: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      list: jest.fn(),
      findByEmail: jest.fn(),
      findByLogin: jest.fn(),
    } as unknown as jest.Mocked<UserRepository>;

    // Substituir a instância do UserRepository no construtor
    (UserRepository as jest.Mock).mockImplementation(() => mockUserRepository);

    // Instanciar o serviço
    userService = new UserService();
  });

  describe('createUser', () => {
    it('deve criar um usuário com sucesso', async () => {
      // Dados de teste
      const userData = {
        nome: 'John Doe',
        email: 'john@example.com',
        login: 'johndoe',
        senha: '123456',
      } as User;
      const createdUser = {      
        ...userData,
        id: 1,
      } as User;

      // Configuração dos mocks
      mockUserRepository.findByEmail.mockResolvedValue(null);
      mockUserRepository.create.mockResolvedValue(createdUser);

      // Execução do método
      const result = await userService.createUser(userData);

      // Verificações
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith('john@example.com');
      expect(mockUserRepository.create).toHaveBeenCalledWith(userData);
      expect(result).toEqual(createdUser);
    });

    it('deve lançar erro quando o email já está cadastrado', async () => {
      // Dados de teste
      const userData = {
        nome: 'John Doe',
        email: 'existing@example.com',
        login: 'johndoe',
        senha: '123456',
      } as User;
      const existingUser = {        
        ...userData,
        id: 1,
      } as User;

      // Configuração dos mocks
      mockUserRepository.findByEmail.mockResolvedValue(existingUser);

      // Execução do método e verificação
      await expect(userService.createUser(userData)).rejects.toThrow('Email já cadastrado');
      expect(mockUserRepository.create).not.toHaveBeenCalled();
    });

    it('deve lançar erro quando o email não é fornecido', async () => {
      // Dados de teste
      const userData = {
        nome: 'John Doe',
        email: '',
        login: 'johndoe',
        senha: '123456',
      } as User;

      // Execução do método e verificação
      await expect(userService.createUser(userData)).rejects.toThrow('Email é obrigatório');
      expect(mockUserRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('updateUser', () => {
    it('deve atualizar um usuário com sucesso', async () => {
      // Dados de teste
      const userId = 1;
      const userData = {
        nome: 'John Updated',
      };
      const existingUser = {
        id: userId,
        nome: 'John Doe',
        email: 'john@example.com',
        login: 'johndoe',
        senha: '123456',
      } as User;
      const updatedUser = {
        ...existingUser,
        ...userData,
      } as User;

      // Configuração dos mocks
      mockUserRepository.findByid.mockResolvedValue(existingUser);
      mockUserRepository.update.mockResolvedValue(updatedUser);

      // Execução do método
      const result = await userService.updateUser(userId, userData);

      // Verificações
      expect(mockUserRepository.findByid).toHaveBeenCalledWith(userId);
      expect(mockUserRepository.update).toHaveBeenCalledWith(userId, userData);
      expect(result).toEqual(updatedUser);
    });

    it('deve lançar erro quando o usuário não existe', async () => {
      // Configuração dos mocks
      mockUserRepository.findByid.mockResolvedValue(null);

      // Execução do método e verificação
      await expect(userService.updateUser(999, { nome: 'John Updated' })).rejects.toThrow('Usuário não encontrado');
      expect(mockUserRepository.update).not.toHaveBeenCalled();
    });
  });

  describe('findUserByEmail', () => {
    it('deve encontrar um usuário pelo email', async () => {
      // Dados de teste
      const email = 'john@example.com';
      const user = {
        id: 1,
        nome: 'John Doe',
        email,
        login: 'johndoe',
        senha: '123456',
      } as User;

      // Configuração dos mocks
      mockUserRepository.findByEmail.mockResolvedValue(user);

      // Execução do método
      const result = await userService.findUserByEmail(email);

      // Verificações
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(email);
      expect(result).toEqual(user);
    });

    it('deve retornar null quando o usuário não existe', async () => {
      // Configuração dos mocks
      mockUserRepository.findByEmail.mockResolvedValue(null);

      // Execução do método
      const result = await userService.findUserByEmail('nonexistent@example.com');

      // Verificações
      expect(result).toBeNull();
    });
  });

  describe('findUserByLogin', () => {
    it('deve encontrar um usuário pelo login', async () => {
      // Dados de teste
      const login = 'johndoe';
      const user = {
        id: 1,
        nome: 'John Doe',
        email: 'john@example.com',
        login,
        senha: '123456',
      } as User;

      // Configuração dos mocks
      mockUserRepository.findByLogin.mockResolvedValue(user);

      // Execução do método
      const result = await userService.findUserByLogin(login);

      // Verificações
      expect(mockUserRepository.findByLogin).toHaveBeenCalledWith(login);
      expect(result).toEqual(user);
    });

    it('deve retornar null quando o usuário não existe', async () => {
      // Configuração dos mocks
      mockUserRepository.findByLogin.mockResolvedValue(null);

      // Execução do método
      const result = await userService.findUserByLogin('nonexistent');

      // Verificações
      expect(result).toBeNull();
    });
  });

  describe('deleteUser', () => {
    it('deve deletar um usuário com sucesso', async () => {
      // Dados de teste
      const userId = 1;
      const user = {
        id: userId,
        nome: 'John Doe',
        email: 'john@example.com',
        login: 'johndoe',
        senha: '123456',
      } as User;

      // Configuração dos mocks
      mockUserRepository.findByid.mockResolvedValue(user);
      mockUserRepository.delete.mockResolvedValue(true);

      // Execução do método
      const result = await userService.deleteUser(userId);

      // Verificações
      expect(mockUserRepository.findByid).toHaveBeenCalledWith(userId);
      expect(mockUserRepository.delete).toHaveBeenCalledWith(userId);
      expect(result).toBe(true);
    });

    it('deve lançar erro quando o usuário não existe', async () => {
      // Configuração dos mocks
      mockUserRepository.findByid.mockResolvedValue(null);

      // Execução do método e verificação
      await expect(userService.deleteUser(999)).rejects.toThrow('Usuário não encontrado');
      expect(mockUserRepository.delete).not.toHaveBeenCalled();
    });
  });

  describe('getUserById', () => {
    it('deve encontrar um usuário pelo ID', async () => {
      // Dados de teste
      const userId = 1;
      const user = {
        id: userId,
        nome: 'John Doe',
        email: 'john@example.com',
        login: 'johndoe',
        senha: '123456',
      } as User;

      // Configuração dos mocks
      mockUserRepository.findByid.mockResolvedValue(user);

      // Execução do método
      const result = await userService.getUserById(userId);

      // Verificações
      expect(mockUserRepository.findByid).toHaveBeenCalledWith(userId);
      expect(result).toEqual(user);
    });

    it('deve retornar null quando o usuário não existe', async () => {
      // Configuração dos mocks
      mockUserRepository.findByid.mockResolvedValue(null);

      // Execução do método
      const result = await userService.getUserById(999);

      // Verificações
      expect(result).toBeNull();
    });
  });

  describe('listUsers', () => {
    it('deve listar todos os usuários', async () => {
      // Dados de teste
      const users = [
        {
          id: 1,
          nome: 'John Doe',
          email: 'john@example.com',
          login: 'johndoe',
          senha: '123456',
        },
        {
          id: 2,
          nome: 'Jane Doe',
          email: 'jane@example.com',
          login: 'janedoe',
          senha: '123456',
        },
      ] as User[];

      // Configuração dos mocks
      mockUserRepository.list.mockResolvedValue(users);

      // Execução do método
      const result = await userService.listUsers();

      // Verificações
      expect(mockUserRepository.list).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });
});
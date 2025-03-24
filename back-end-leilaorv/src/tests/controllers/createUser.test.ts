import request from 'supertest';
import express from 'express';
import { AppDataSource } from '../../config/db.datasource'; 
import router from '../../routes/routes';  
import { User } from '../../models/user'; 


const app = express();
app.use(express.json());
app.use("/", router);


jest.mock('../../config/db.datasource', () => ({
  AppDataSource: {
    getRepository: jest.fn().mockImplementation((entity) => {
      if (entity === User) {

        return {
          findOne: jest.fn().mockResolvedValue(null), 
          
          create: jest.fn().mockReturnValue({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            login: 'johndoe',
            senha: '123456',
          }),
          save: jest.fn().mockResolvedValue({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            login: 'johndoe',
            senha: '123456',
            id: 1,
          }),
        };
      }
      return {};
    }),
    initialize: jest.fn(),
  },
}));

describe('POST /createuser', () => {

    it('Deve criar um usuário com sucesso', async () => {
      const mockUser = {
        nome: 'John Doe',
        email: 'johndoe@example.com',
        login: 'johndoe',
        senha: '123456',
      };
  
      // Mockando o comportamento do repositório para `findOne` (nenhum usuário encontrado)
      (AppDataSource.getRepository(User).findOne as jest.Mock).mockResolvedValue(null);     
      (AppDataSource.getRepository(User).create as jest.Mock).mockReturnValue(mockUser);
      (AppDataSource.getRepository(User).save as jest.Mock).mockResolvedValue(mockUser);
  
      const response = await request(app).post('/createuser').send(mockUser);
  
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Usuário criado com sucesso!');
      expect(response.body.user.nome).toBe(mockUser.nome);
      expect(response.body.user.email).toBe(mockUser.email);
    })
})
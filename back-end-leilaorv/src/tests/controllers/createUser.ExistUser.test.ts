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
        // Aqui, estamos explicitamente tipando as funções mockadas
        return {
          findOne: jest.fn().mockResolvedValue({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            login: 'johndoe',
            senha: '123456',
            id: 1,}), 

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

    it('Deve retornar erro se o e-mail já estiver cadastrado', async () => {
        const mockUser = {
          nome: 'John Doe',
          email: 'johndoe@example.com',
          login: 'johndoe',
          senha: '123456',
          id: 1,
        };
    
        (AppDataSource.getRepository(User).findOne as jest.Mock).mockResolvedValueOnce(mockUser);
              
        const response = await request(app).post('/createuser').send(mockUser);
    
        console.log(response.status);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Email já cadastrado');
      });
})
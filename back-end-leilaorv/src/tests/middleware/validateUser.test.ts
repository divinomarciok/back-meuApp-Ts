import { validateUser } from '../../middleware/validateUser'; 
import express, { Request, Response } from 'express';
import request from 'supertest';

// Configurando um app Express para testar o middleware
const app = express();
app.use(express.json());

// Rota de teste que utiliza o middleware
app.post('/createuser', validateUser, (req: Request, res: Response) => {
    res.status(200).json({ message: 'Validação bem-sucedida!' });
});

describe('Middleware validateUser', () => {
    it('Deve retornar erro se os campos obrigatórios não forem fornecidos', async () => {
        const response = await request(app).post('/createuser').send({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            login: '',
            senha: '123456',
        });

        console.log(response.status);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Todos os campos são obrigatórios: nome, email login e senha.');
    });

    it('Deve retornar erro se o formato do e-mail for inválido', async () => {
        const response = await request(app).post('/createuser').send({
            nome: 'John Doe',
            email: 'invalid-email',
            login: 'johndoe',
            senha: '123456',
        });

        console.log(response.status);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Formato de email inválido.');
    });

    it('Deve retornar erro se a senha for menor que 6 caracteres', async () => {
        const response = await request(app).post('/createuser').send({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            login: 'johndoe',
            senha: '1234',
        });

        console.log(response.status);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('A senha deve ter no mínimo 6 caracteres.');
    });

    it('Deve passar a validação se todos os campos forem válidos', async () => {
        const response = await request(app).post('/createuser').send({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            login: 'johndoe',
            senha: '123456',
        });

        console.log(response.status);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Validação bem-sucedida!');
    });
});

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
const validateUser_1 = require("../../middleware/validateUser");
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
// Configurando um app Express para testar o middleware
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Rota de teste que utiliza o middleware
app.post('/createuser', validateUser_1.validateUser, (req, res) => {
    res.status(200).json({ message: 'Validação bem-sucedida!' });
});
describe('Middleware validateUser', () => {
    it('Deve retornar erro se os campos obrigatórios não forem fornecidos', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post('/createuser').send({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            login: '',
            senha: '123456',
        });
        console.log(response.status);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Todos os campos são obrigatórios: nome, email login e senha.');
    }));
    it('Deve retornar erro se o formato do e-mail for inválido', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post('/createuser').send({
            nome: 'John Doe',
            email: 'invalid-email',
            login: 'johndoe',
            senha: '123456',
        });
        console.log(response.status);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Formato de email inválido.');
    }));
    it('Deve retornar erro se a senha for menor que 6 caracteres', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post('/createuser').send({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            login: 'johndoe',
            senha: '1234',
        });
        console.log(response.status);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('A senha deve ter no mínimo 6 caracteres.');
    }));
    it('Deve passar a validação se todos os campos forem válidos', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post('/createuser').send({
            nome: 'John Doe',
            email: 'johndoe@example.com',
            login: 'johndoe',
            senha: '123456',
        });
        console.log(response.status);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Validação bem-sucedida!');
    }));
});

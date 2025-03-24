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
const db_datasource_1 = require("../../config/db.datasource");
const routes_1 = __importDefault(require("../../routes/routes"));
const user_1 = require("../../models/user");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", routes_1.default);
jest.mock('../../config/db.datasource', () => ({
    AppDataSource: {
        getRepository: jest.fn().mockImplementation((entity) => {
            if (entity === user_1.User) {
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
    it('Deve criar um usuário com sucesso', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = {
            nome: 'John Doe',
            email: 'johndoe@example.com',
            login: 'johndoe',
            senha: '123456',
        };
        // Mockando o comportamento do repositório para `findOne` (nenhum usuário encontrado)
        db_datasource_1.AppDataSource.getRepository(user_1.User).findOne.mockResolvedValue(null);
        db_datasource_1.AppDataSource.getRepository(user_1.User).create.mockReturnValue(mockUser);
        db_datasource_1.AppDataSource.getRepository(user_1.User).save.mockResolvedValue(mockUser);
        const response = yield (0, supertest_1.default)(app).post('/createuser').send(mockUser);
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Usuário criado com sucesso!');
        expect(response.body.user.nome).toBe(mockUser.nome);
        expect(response.body.user.email).toBe(mockUser.email);
    }));
});

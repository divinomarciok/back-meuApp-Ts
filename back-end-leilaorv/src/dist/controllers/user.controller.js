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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../service/user.service"); // Importe o UserService
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserController {
    constructor() {
        this.userService = new user_service_1.UserService();
    }
    // CREATE - Criar usuário
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _a = req.body, { nome, email, senha } = _a, outrosDados = __rest(_a, ["nome", "email", "senha"]);
                const user = yield this.userService.createUser(Object.assign({ nome, email, senha }, outrosDados));
                const { senha: _ } = user, userSemSenha = __rest(user, ["senha"]);
                res.status(201).json(userSemSenha);
            }
            catch (error) {
                console.error('Erro ao criar usuário:', error);
                res.status(400).json({ message: error.message || 'Erro ao criar usuário' });
            }
        });
    }
    // READ - Buscar um usuário por ID
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const user = yield this.userService.getUserById(id);
                if (!user) {
                    res.status(404).json({ message: 'Usuário não encontrado' });
                    return;
                }
                const { senha: _ } = user, userSemSenha = __rest(user, ["senha"]);
                res.json(userSemSenha);
            }
            catch (error) {
                console.error('Erro ao buscar usuário:', error);
                res.status(500).json({ message: 'Erro ao buscar usuário' });
            }
        });
    }
    // READ - Buscar um usuário por E-mail (via POST)
    findByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                if (!email) {
                    res.status(400).json({ message: 'O campo email é obrigatório no corpo da requisição.' });
                    return;
                }
                const user = yield this.userService.findUserByEmail(email);
                if (!user) {
                    res.status(404).json({ message: 'Usuário não encontrado' });
                    return;
                }
                const { senha: _ } = user, userSemSenha = __rest(user, ["senha"]);
                res.json(userSemSenha);
            }
            catch (error) {
                console.error('Erro ao buscar usuário por email:', error);
                res.status(500).json({ message: 'Erro ao buscar usuário' });
            }
        });
    }
    // UPDATE - Atualizar usuário
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const _a = req.body, { senha, email } = _a, dadosAtualizacao = __rest(_a, ["senha", "email"]);
                // Se estiver atualizando a senha, faz o hash aqui no controller (camada de apresentação)
                if (senha) {
                    dadosAtualizacao.senha = yield bcryptjs_1.default.hash(senha, 10);
                }
                if (email) {
                    dadosAtualizacao.email = email; // Deixa o UserService lidar com a verificação de email duplicado, se necessário
                }
                const updatedUser = yield this.userService.updateUser(id, dadosAtualizacao);
                if (!updatedUser) {
                    res.status(404).json({ message: 'Usuário não encontrado' });
                    return;
                }
                const { senha: _ } = updatedUser, userSemSenha = __rest(updatedUser, ["senha"]);
                res.json(userSemSenha);
            }
            catch (error) {
                console.error('Erro ao atualizar usuário:', error);
                res.status(400).json({ message: error.message || 'Erro ao atualizar usuário' });
            }
        });
    }
    // DELETE - Remover usuário
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const deleted = yield this.userService.deleteUser(id);
                if (!deleted) {
                    res.status(404).json({ message: 'Usuário não encontrado' });
                    return;
                }
                res.status(204).send();
            }
            catch (error) {
                console.error('Erro ao deletar usuário:', error);
                res.status(500).json({ message: error.message || 'Erro ao deletar usuário' });
            }
        });
    }
    // LIST - Listar todos os usuários
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userService.listUsers();
                const usersSemSenha = users.map(user => {
                    const { senha: _ } = user, userSemSenha = __rest(user, ["senha"]);
                    return userSemSenha;
                });
                res.json(usersSemSenha);
            }
            catch (error) {
                console.error('Erro ao listar usuários:', error);
                res.status(500).json({ message: 'Erro ao listar usuários' });
            }
        });
    }
}
exports.UserController = UserController;

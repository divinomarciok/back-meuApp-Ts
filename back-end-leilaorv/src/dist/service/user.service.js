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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_respository_1 = require("../repositories/user.respository");
class UserService {
    constructor() {
        this.userRepository = new user_respository_1.UserRepository();
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.userRepository.findByEmail(userData.email);
            if (existingUser) {
                throw new Error('Email já cadastrado');
            }
            if (!userData.email) {
                throw new Error('Email é obrigatório');
            }
            return this.userRepository.create(userData);
        });
    }
    updateUser(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByid(id);
            if (!user) {
                throw new Error('Usuário não encontrado');
            }
            return this.userRepository.update(id, userData);
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findByEmail(email);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByid(id);
            if (!user) {
                throw new Error('Usuário não encontrado');
            }
            return this.userRepository.delete(id);
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findByid(id);
        });
    }
    listUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.list();
        });
    }
}
exports.UserService = UserService;

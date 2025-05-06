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
exports.EnterpriseService = void 0;
const enterprise_repository_1 = require("../repositories/enterprise.repository");
const enterprise_1 = require("../models/enterprise");
const user_1 = require("../models/user");
const db_datasource_1 = require("../config/db.datasource");
class EnterpriseService {
    constructor() {
        this.enterpriseRepository = new enterprise_repository_1.EnterpriseRepository();
    }
    createEnterprise(enterpriseData, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = null;
            const enterprise = new enterprise_1.Enterprise();
            enterprise.address = enterpriseData.address;
            enterprise.cep = enterpriseData.cep;
            enterprise.cnpj = enterpriseData.cnpj;
            enterprise.name = enterpriseData.name;
            if (userId) {
                const userRepository = db_datasource_1.AppDataSource.getRepository(user_1.User);
                user = yield userRepository.findOne({ where: { id: userId } });
                if (!user) {
                    throw new Error('Usuário não encontrado');
                }
                enterprise.user = user;
            }
            return this.enterpriseRepository.create(enterprise);
        });
    }
    updateEnterprise(id, enterpriseData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.enterpriseRepository.update(id, enterpriseData);
        });
    }
    deleteEnterprise(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.enterpriseRepository.delete(id);
        });
    }
    getEnterpriseById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.enterpriseRepository.findByid(id);
        });
    }
    listEnterprises() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.enterpriseRepository.list();
        });
    }
    findEnterprisesByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.enterpriseRepository.findByName(name);
        });
    }
    findEnterprisesByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.enterpriseRepository.findByUser(userId);
        });
    }
    searchEnterprises(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.enterpriseRepository.searchByText(query);
        });
    }
}
exports.EnterpriseService = EnterpriseService;

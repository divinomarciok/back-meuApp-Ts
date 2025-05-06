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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnterpriseController = void 0;
const enterprise_service_1 = require("../service/enterprise.service");
class EnterpriseController {
    constructor() {
        this.enterpriseService = new enterprise_service_1.EnterpriseService();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const enterpriseData = req.body;
                const userId = req.user.id;
                if (!enterpriseData.name) {
                    res.status(400).json({ message: 'Os campos name é obrigatórios' });
                    return;
                }
                const enterprise = yield this.enterpriseService.createEnterprise(enterpriseData, userId);
                const { user: _ } = enterprise, enterpriseNoUser = __rest(enterprise, ["user"]);
                res.status(201).json(enterpriseNoUser);
            }
            catch (error) {
                console.error('Erro ao criar empresa:', error);
                res.status(400).json({ message: error.message || 'Erro ao criar empresa' });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const enterpriseData = req.body;
                if (Object.keys(enterpriseData).length === 0) {
                    res.status(400).json({ message: 'Nenhum dado fornecido para atualização' });
                    return;
                }
                const updatedEnterprise = yield this.enterpriseService.updateEnterprise(id, enterpriseData);
                if (!updatedEnterprise) {
                    res.status(404).json({ message: 'Empresa não encontrada' });
                    return;
                }
                const { user: _ } = updatedEnterprise, enterpriseNoUser = __rest(updatedEnterprise, ["user"]);
                res.status(201).json(enterpriseNoUser);
            }
            catch (error) {
                console.error('Erro ao atualizar empresa:', error);
                res.status(400).json({ message: error.message || 'Erro ao atualizar empresa' });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const deleted = yield this.enterpriseService.deleteEnterprise(id);
                if (!deleted) {
                    res.status(404).json({ message: 'Empresa não encontrada' });
                    return;
                }
                res.status(204).send();
            }
            catch (error) {
                console.error('Erro ao deletar empresa:', error);
                res.status(400).json({ message: error.message || 'Erro ao deletar empresa' });
            }
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const enterprise = yield this.enterpriseService.getEnterpriseById(id);
                if (!enterprise) {
                    res.status(404).json({ message: 'Empresa não encontrada' });
                    return;
                }
                res.json(enterprise);
            }
            catch (error) {
                console.error('Erro ao buscar empresa:', error);
                res.status(500).json({ message: 'Erro ao buscar empresa' });
            }
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const enterprises = yield this.enterpriseService.listEnterprises();
                res.json(enterprises);
            }
            catch (error) {
                console.error('Erro ao listar empresas:', error);
                res.status(500).json({ message: 'Erro ao listar empresas' });
            }
        });
    }
    findByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.query;
                if (!name) {
                    res.status(400).json({ message: 'O campo name é obrigatório na query' });
                    return;
                }
                const enterprises = yield this.enterpriseService.findEnterprisesByName(name.toString());
                if (enterprises.length === 0) {
                    res.status(404).json({ message: 'Nenhuma empresa encontrada com este nome' });
                    return;
                }
                res.json(enterprises);
            }
            catch (error) {
                console.error('Erro ao buscar empresas por nome:', error);
                res.status(500).json({ message: 'Erro ao buscar empresas por nome' });
            }
        });
    }
    findByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = Number(req.params.userId);
                const enterprises = yield this.enterpriseService.findEnterprisesByUser(userId);
                if (enterprises.length === 0) {
                    res.status(404).json({ message: 'Nenhuma empresa encontrada para este usuário' });
                    return;
                }
                res.json(enterprises);
            }
            catch (error) {
                console.error('Erro ao buscar empresas por usuário:', error);
                res.status(500).json({ message: 'Erro ao buscar empresas por usuário' });
            }
        });
    }
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { query } = req.query;
                if (!query || typeof query !== 'string') {
                    res.status(400).json({ message: 'O parâmetro query é obrigatório na URL' });
                    return;
                }
                const enterprises = yield this.enterpriseService.searchEnterprises(query.toString());
                if (enterprises.length === 0) {
                    res.status(404).json({ message: 'Nenhuma empresa encontrada com os critérios de busca' });
                    return;
                }
                res.json(enterprises);
            }
            catch (error) {
                console.error('Erro ao buscar empresas:', error);
                res.status(500).json({ message: 'Erro ao buscar empresas' });
            }
        });
    }
}
exports.EnterpriseController = EnterpriseController;

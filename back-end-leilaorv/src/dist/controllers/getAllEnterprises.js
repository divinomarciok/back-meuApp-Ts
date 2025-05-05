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
exports.getAllEnterprises = void 0;
const db_datasource_1 = require("../config/db.datasource");
const enterprise_1 = require("../models/enterprise");
const getAllEnterprises = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const enterpriseRepository = db_datasource_1.AppDataSource.getRepository(enterprise_1.Enterprise);
        const enterprises = yield enterpriseRepository.find();
        res.status(200).json(enterprises);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar empresas' });
    }
});
exports.getAllEnterprises = getAllEnterprises;

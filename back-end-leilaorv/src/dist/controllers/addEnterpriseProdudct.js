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
exports.addEnterpriseProduct = void 0;
const db_datasource_1 = require("../config/db.datasource");
const price_list_1 = require("../models/price_list");
const enterprise_1 = require("../models/enterprise");
const product_1 = require("../models/product");
const user_1 = require("../models/user");
const addEnterpriseProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { isSale, enterprise_id, product_id, price, date_start } = req.body;
    if (typeof req.user !== 'object' || req.user === null || !('id' in req.user)) {
        res.status(401).json({ message: 'Usuário não autenticado' });
        return;
    }
    const userId = req.user.id;
    try {
        const enterpriseRepository = db_datasource_1.AppDataSource.getRepository(enterprise_1.Enterprise);
        const productRepository = db_datasource_1.AppDataSource.getRepository(product_1.Product);
        const userRepository = db_datasource_1.AppDataSource.getRepository(user_1.User);
        const priceListReposity = db_datasource_1.AppDataSource.getRepository(price_list_1.PriceList);
        const enterprise = yield enterpriseRepository.findOne({ where: { id: enterprise_id } });
        if (!enterprise) {
            res.status(404).json({ message: 'Empresa não encontrada' });
            return;
        }
        const product = yield productRepository.findOne({ where: { id: product_id } });
        if (!product) {
            res.status(404).json({ message: 'Produto não encontrado' });
            return;
        }
        const user = yield userRepository.findOne({ where: { id: userId } });
        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }
        const newPriceList = priceListReposity.create({
            isSale: undefined,
            enterprise,
            product,
            price,
            user,
        });
        yield priceListReposity.save(newPriceList);
        res.status(201).json({
            message: 'Produto adicionado à empresa com sucesso!',
            enterpriseProduct: {
                id: newPriceList.id,
                enterprise_id: enterprise.id,
                product_id: product.id,
                user_id: user.id,
                price: newPriceList.price,
            },
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao adicionar produto à empresa' });
    }
});
exports.addEnterpriseProduct = addEnterpriseProduct;

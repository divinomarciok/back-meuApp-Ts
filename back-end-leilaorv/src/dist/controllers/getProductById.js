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
exports.getProductById = void 0;
const db_datasource_1 = require("../config/db.datasource");
const product_1 = require("../models/product");
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    try {
        const productRepository = db_datasource_1.AppDataSource.getRepository(product_1.Product);
        const product = yield productRepository.findOne({ where: { id: parseInt(productId, 10) } });
        if (!product) {
            res.status(404).json({ message: 'Produto não encontrado' });
            return;
        }
        res.status(200).json(product);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar produto' });
    }
});
exports.getProductById = getProductById;

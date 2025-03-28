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
exports.getAllProducts = void 0;
const db_datasource_1 = require("../config/db.datasource");
const product_1 = require("../models/product");
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productRepository = db_datasource_1.AppDataSource.getRepository(product_1.Product);
        const products = yield productRepository.find();
        const formattedProducts = products.map(product => ({
            id: product.id,
            nome: product.name,
            tamanho: product.weigth,
            marca: product.mark, // Placeholder, pois a marca não está no modelo
            categoria: product.category,
        }));
        res.status(201).json(formattedProducts);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar produtos' });
    }
});
exports.getAllProducts = getAllProducts;

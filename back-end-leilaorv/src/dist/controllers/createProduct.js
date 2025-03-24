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
exports.createProduct = void 0;
const db_datasource_1 = require("../config/db.datasource");
const product_1 = require("../models/product");
const user_1 = require("../models/user");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, category, weigth, description } = req.body;
    try {
        const productRepository = db_datasource_1.AppDataSource.getRepository(product_1.Product);
        const userRepository = db_datasource_1.AppDataSource.getRepository(user_1.User);
        if (typeof req.user !== 'object' || req.user === null || !('id' in req.user)) {
            res.status(401).json({ message: 'Usuário não autenticado' });
            return;
        }
        const userId = req.user.id;
        // Verifica se o usuário existe
        const user = yield userRepository.findOne({ where: { id: userId } });
        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }
        const existingProduct = yield productRepository.findOne({ where: { name } });
        if (existingProduct) {
            res.status(400).json({ message: 'Produto já cadastrado' });
            return;
        }
        // Cria o novo produto
        const newProduct = productRepository.create({
            name,
            category,
            weigth,
            description,
            user,
        });
        yield productRepository.save(newProduct);
        res.status(201).json({
            message: 'Produto criado com sucesso!',
            product: { id: newProduct.id, nomeProd: newProduct.name, categoriaProd: newProduct.category },
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao criar produto' });
    }
});
exports.createProduct = createProduct;

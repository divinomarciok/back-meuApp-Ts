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
exports.ProductController = void 0;
const product_service_1 = require("../service/product.service");
class ProductController {
    constructor() {
        this.productService = new product_service_1.ProductService();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productData = req.body;
                //const userId = Number(req.body.userId); 
                const userId = req.user.id;
                console.log('user ID : ', userId);
                const categoryId = req.body.categoryId ? Number(req.body.categoryId) : undefined;
                let filePath;
                if (req.file) {
                    filePath = `/uploads/products/${req.file.filename}`;
                }
                const product = yield this.productService.createProduct(productData, userId, categoryId, filePath);
                res.status(201).json(product);
            }
            catch (error) {
                console.error('Erro ao criar produto:', error);
                res.status(400).json({ message: error.message || 'Erro ao criar produto' });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const productData = req.body;
                const categoryId = req.body.categoryId ? Number(req.body.categoryId) : undefined;
                let filePath;
                if (req.file) {
                    filePath = `/uploads/products/${req.file.filename}`;
                }
                const updatedProduct = yield this.productService.updateProduct(id, productData, categoryId, filePath);
                if (!updatedProduct) {
                    res.status(404).json({ message: 'Produto não encontrado' });
                    return;
                }
                res.json(updatedProduct);
            }
            catch (error) {
                console.error('Erro ao atualizar produto:', error);
                res.status(400).json({ message: error.message || 'Erro ao atualizar produto' });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const deleted = yield this.productService.deleteProduct(id);
                if (!deleted) {
                    res.status(404).json({ message: 'Produto não encontrado' });
                    return;
                }
                res.status(204).send();
            }
            catch (error) {
                console.error('Erro ao deletar produto:', error);
                res.status(500).json({ message: error.message || 'Erro ao deletar produto' });
            }
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const product = yield this.productService.getProductById(id);
                if (!product) {
                    res.status(404).json({ message: 'Produto não encontrado' });
                    return;
                }
                res.json(product);
            }
            catch (error) {
                console.error('Erro ao buscar produto:', error);
                res.status(500).json({ message: 'Erro ao buscar produto' });
            }
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.productService.listProducts();
                res.json(products);
            }
            catch (error) {
                console.error('Erro ao listar produtos:', error);
                res.status(500).json({ message: 'Erro ao listar produtos' });
            }
        });
    }
    findByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.query;
                if (!name) {
                    res.status(400).json({ message: 'O campo name é obrigatório no corpo da requisição.' });
                    return;
                }
                const products = yield this.productService.findProductsByName(name.toString());
                if (products.length === 0) {
                    res.status(404).json({ message: 'Nenhum produto encontrado com este nome' });
                    return;
                }
                res.json(products);
            }
            catch (error) {
                console.error('Erro ao buscar produtos por nome:', error);
                res.status(500).json({ message: 'Erro ao buscar produtos por nome' });
            }
        });
    }
    findByMark(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { mark } = req.query;
                if (!mark) {
                    res.status(400).json({ message: 'O campo mark é obrigatório no corpo da requisição.' });
                    return;
                }
                const products = yield this.productService.findProductsByMark(mark.toString());
                if (products.length === 0) {
                    res.status(404).json({ message: 'Nenhum produto encontrado com esta marca' });
                    return;
                }
                res.json(products);
            }
            catch (error) {
                console.error('Erro ao buscar produtos por marca:', error);
                res.status(500).json({ message: 'Erro ao buscar produtos por marca' });
            }
        });
    }
    findByCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryId = Number(req.query.categoryId);
                const products = yield this.productService.findProductsByCategory(categoryId);
                if (products.length === 0) {
                    res.status(404).json({ message: 'Nenhum produto encontrado nesta categoria' });
                    return;
                }
                res.json(products);
            }
            catch (error) {
                console.error('Erro ao buscar produtos por categoria:', error);
                res.status(500).json({ message: 'Erro ao buscar produtos por categoria' });
            }
        });
    }
    findByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = Number(req.params.userId);
                const products = yield this.productService.findProductsByUser(userId);
                if (products.length === 0) {
                    res.status(404).json({ message: 'Nenhum produto encontrado para este usuário' });
                    return;
                }
                res.json(products);
            }
            catch (error) {
                console.error('Erro ao buscar produtos por usuário:', error);
                res.status(500).json({ message: 'Erro ao buscar produtos por usuário' });
            }
        });
    }
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { query } = req.query;
                if (!query || typeof query !== 'string') {
                    res.status(400).json({ message: 'O parâmetro query é obrigatório na URL.' });
                    return;
                }
                const products = yield this.productService.searchProducts(query);
                if (products.length === 0) {
                    res.status(404).json({ message: 'Nenhum produto encontrado com os critérios de busca' });
                    return;
                }
                res.json(products);
            }
            catch (error) {
                console.error('Erro ao buscar produtos:', error);
                res.status(500).json({ message: 'Erro ao buscar produtos' });
            }
        });
    }
}
exports.ProductController = ProductController;

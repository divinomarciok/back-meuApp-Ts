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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const product_repository_1 = require("../repositories/product.repository");
const product_1 = require("../models/product");
const category_repository_1 = require("../repositories/category.repository");
const user_respository_1 = require("../repositories/user.respository");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class ProductService {
    constructor() {
        this.productRepository = new product_repository_1.ProductRepository();
        this.categoryRepository = new category_repository_1.CategoryRepository();
        this.userRepository = new user_respository_1.UserRepository();
    }
    createProduct(productData, userId, categoryId, filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByid(userId);
            if (!user) {
                throw new Error('Usuário não encontrado');
            }
            const product = new product_1.Product();
            product.name = productData.name;
            product.mark = productData.mark;
            product.category = productData.category;
            product.description = productData.description;
            product.unidade_measure = productData.unidade_measure;
            product.weigth = productData.weigth;
            product.user = user;
            if (filePath) {
                product.img_url = filePath;
            }
            if (categoryId) {
                const category = yield this.categoryRepository.findByid(categoryId);
                if (!category) {
                    throw new Error('Categoria não encontrada');
                }
                product.category = category;
            }
            return this.productRepository.create(product);
        });
    }
    updateProduct(id, productData, categoryId, filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingProduct = yield this.productRepository.findByid(id);
            if (!existingProduct) {
                throw new Error('Produto não encontrado');
            }
            if (filePath && existingProduct.img_url) {
                try {
                    const oldFilePath = path_1.default.resolve(existingProduct.img_url);
                    if (fs_1.default.existsSync(oldFilePath)) {
                        fs_1.default.unlinkSync(oldFilePath);
                    }
                }
                catch (error) {
                    console.error('Erro ao remover arquivo antigo:', error);
                }
            }
            const updateData = Object.assign({}, productData);
            if (filePath) {
                updateData.img_url = filePath;
            }
            if (categoryId) {
                const category = yield this.categoryRepository.findByid(categoryId);
                if (!category) {
                    throw new Error('Categoria não encontrada');
                }
                updateData.category = category;
            }
            const updateResult = yield this.productRepository.update(id, updateData);
            if (updateResult) {
                return this.productRepository.findByIdWithRelations(id);
            }
            return null;
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepository.findByid(id);
            if (!product) {
                throw new Error('Produto não encontrado');
            }
            if (product.img_url) {
                try {
                    const filePath = path_1.default.resolve(product.img_url);
                    if (fs_1.default.existsSync(filePath)) {
                        fs_1.default.unlinkSync(filePath);
                    }
                }
                catch (error) {
                    console.error('Erro ao remover arquivo:', error);
                }
            }
            return this.productRepository.delete(id);
        });
    }
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepository.findByIdWithRelations(id);
        });
    }
    listProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepository.listWithRelations();
        });
    }
    findProductsByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepository.findByName(name);
        });
    }
    findProductsByMark(mark) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepository.findByMark(mark);
        });
    }
    findProductsByCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepository.findByCategory(categoryId);
        });
    }
    findProductsByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepository.findByUser(userId);
        });
    }
    searchProducts(searchText) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productRepository.searchByText(searchText);
        });
    }
}
exports.ProductService = ProductService;

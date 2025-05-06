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
exports.CategoryService = void 0;
const category_repository_1 = require("../repositories/category.repository");
const category_1 = require("../models/category");
const product_repository_1 = require("../repositories/product.repository");
class CategoryService {
    constructor() {
        this.categoryRepository = new category_repository_1.CategoryRepository();
        this.productRepository = new product_repository_1.ProductRepository();
    }
    createCategory(categoryData) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield this.categoryRepository.existsByName(categoryData.name);
            if (exists) {
                throw new Error('Já existe uma categoria com este nome');
            }
            const category = new category_1.Category();
            category.name = categoryData.name;
            category.description = categoryData.description;
            return this.categoryRepository.create(category);
        });
    }
    updateCategory(id, categoryData) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingCategory = yield this.categoryRepository.findByid(id);
            if (!existingCategory) {
                throw new Error('Categoria não encontrada');
            }
            if (categoryData.name && categoryData.name !== existingCategory.name) {
                const exists = yield this.categoryRepository.existsByName(categoryData.name);
                if (exists) {
                    throw new Error('Já existe uma categoria com este nome');
                }
            }
            return this.categoryRepository.update(id, categoryData);
        });
    }
    deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryRepository.findByid(id);
            if (!category) {
                throw new Error('Categoria não encontrada');
            }
            const products = yield this.productRepository.findByCategory(id);
            if (products.length > 0) {
                throw new Error('Não é possível excluir a categoria pois existem produtos associados a ela');
            }
            return this.categoryRepository.delete(id);
        });
    }
    getCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.categoryRepository.findByid(id);
        });
    }
    listCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.categoryRepository.list();
        });
    }
    findCategoriesByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.categoryRepository.findByName(name);
        });
    }
    searchCategories(searchText) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.categoryRepository.searchByText(searchText);
        });
    }
}
exports.CategoryService = CategoryService;

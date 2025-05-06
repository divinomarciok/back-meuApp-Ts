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
exports.CategoryController = void 0;
const category_service_1 = require("../service/category.service");
class CategoryController {
    constructor() {
        this.categoryService = new category_service_1.CategoryService();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryData = req.body;
                if (!categoryData.name || !categoryData.description) {
                    res.status(400).json({ message: 'Os campos name e description são obrigatórios' });
                    return;
                }
                const category = yield this.categoryService.createCategory(categoryData);
                res.status(201).json(category);
            }
            catch (error) {
                console.error('Erro ao criar categoria:', error);
                res.status(400).json({ message: error.message || 'Erro ao criar categoria' });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const categoryData = req.body;
                if (Object.keys(categoryData).length === 0) {
                    res.status(400).json({ message: 'Nenhum dado fornecido para atualização' });
                    return;
                }
                const updatedCategory = yield this.categoryService.updateCategory(id, categoryData);
                if (!updatedCategory) {
                    res.status(404).json({ message: 'Categoria não encontrada' });
                    return;
                }
                res.json(updatedCategory);
            }
            catch (error) {
                console.error('Erro ao atualizar categoria:', error);
                res.status(400).json({ message: error.message || 'Erro ao atualizar categoria' });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const deleted = yield this.categoryService.deleteCategory(id);
                if (!deleted) {
                    res.status(404).json({ message: 'Categoria não encontrada' });
                    return;
                }
                res.status(204).send();
            }
            catch (error) {
                console.error('Erro ao deletar categoria:', error);
                res.status(400).json({ message: error.message || 'Erro ao deletar categoria' });
            }
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const category = yield this.categoryService.getCategoryById(id);
                if (!category) {
                    res.status(404).json({ message: 'Categoria não encontrada' });
                    return;
                }
                res.json(category);
            }
            catch (error) {
                console.error('Erro ao buscar categoria:', error);
                res.status(500).json({ message: 'Erro ao buscar categoria' });
            }
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield this.categoryService.listCategories();
                res.json(categories);
            }
            catch (error) {
                console.error('Erro ao listar categorias:', error);
                res.status(500).json({ message: 'Erro ao listar categorias' });
            }
        });
    }
    findByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.query;
                if (!name) {
                    res.status(400).json({ message: 'O campo name é obrigatório no corpo da requisição' });
                    return;
                }
                const categories = yield this.categoryService.findCategoriesByName(name.toString());
                if (categories.length === 0) {
                    res.status(404).json({ message: 'Nenhuma categoria encontrada com este nome' });
                    return;
                }
                res.json(categories);
            }
            catch (error) {
                console.error('Erro ao buscar categorias por nome:', error);
                res.status(500).json({ message: 'Erro ao buscar categorias por nome' });
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
                const categories = yield this.categoryService.searchCategories(query);
                if (categories.length === 0) {
                    res.status(404).json({ message: 'Nenhuma categoria encontrada com os critérios de busca' });
                    return;
                }
                res.json(categories);
            }
            catch (error) {
                console.error('Erro ao buscar categorias:', error);
                res.status(500).json({ message: 'Erro ao buscar categorias' });
            }
        });
    }
}
exports.CategoryController = CategoryController;

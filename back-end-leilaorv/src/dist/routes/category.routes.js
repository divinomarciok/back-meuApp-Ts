"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const authenticateToken_1 = require("../middleware/authenticateToken");
const router = (0, express_1.Router)();
exports.categoryRoutes = router;
const categoryController = new category_controller_1.CategoryController();
// Rotas que requerem autenticação
router.post('/categories', authenticateToken_1.authenticateToken, (req, res) => categoryController.create(req, res));
router.put('/categories/:id', authenticateToken_1.authenticateToken, (req, res) => categoryController.update(req, res));
router.delete('/categories/:id', authenticateToken_1.authenticateToken, (req, res) => categoryController.delete(req, res));
// Rotas públicas (podem ser acessadas sem autenticação)
router.get('/categories', (req, res) => categoryController.list(req, res));
router.get('/categories/:id', (req, res) => categoryController.findById(req, res));
router.post('/categories/name', (req, res) => categoryController.findByName(req, res));
router.get('/categories/search', (req, res) => categoryController.search(req, res));

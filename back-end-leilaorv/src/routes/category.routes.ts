import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { authenticateToken } from '../middleware/authenticateToken';

const router = Router();
const categoryController = new CategoryController();

// Rotas que requerem autenticação
router.post('/categories', authenticateToken, (req, res) => categoryController.create(req, res));
router.put('/categories/:id', authenticateToken, (req, res) => categoryController.update(req, res));
router.delete('/categories/:id', authenticateToken, (req, res) => categoryController.delete(req, res));

// Rotas públicas (podem ser acessadas sem autenticação)
router.get('/categories', (req, res) => categoryController.list(req, res));
router.get('/categories/:id', (req, res) => categoryController.findById(req, res));
router.post('/categories/name', (req, res) => categoryController.findByName(req, res));
router.get('/categories/search', (req, res) => categoryController.search(req, res));

export { router as categoryRoutes };
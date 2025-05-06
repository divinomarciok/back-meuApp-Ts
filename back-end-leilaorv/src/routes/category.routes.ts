import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { authenticateToken } from '../middleware/authenticateToken';

const router = Router();
const categoryController = new CategoryController();

// Rotas que requerem autenticação
router.get('/categories/name',authenticateToken, (req, res) => categoryController.findByName(req, res));
router.get('/categories/search',authenticateToken, (req, res) => categoryController.search(req, res));

router.post('/categories', authenticateToken, (req, res) => categoryController.create(req, res));
router.put('/categories/:id', authenticateToken, (req, res) => categoryController.update(req, res));
router.delete('/categories/:id', authenticateToken, (req, res) => categoryController.delete(req, res));

router.get('/categories',authenticateToken, (req, res) => categoryController.list(req, res));
router.get('/categories/:id',authenticateToken, (req, res) => categoryController.findById(req, res));

export { router as categoryRoutes };
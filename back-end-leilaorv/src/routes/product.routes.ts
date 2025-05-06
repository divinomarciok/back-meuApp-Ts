import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { uploadMiddleware } from '../middleware/upload.middleware';
import { authenticateToken } from '../middleware/authenticateToken';

const router = Router();
const productController = new ProductController();


router.post('/products', authenticateToken, uploadMiddleware.single('image'), (req, res) => productController.create(req, res));
router.put('/products/:id', authenticateToken, uploadMiddleware.single('image'), (req, res) => productController.update(req, res));
router.delete('/products/:id', authenticateToken, (req, res) => productController.delete(req, res));
router.get('/products', authenticateToken, (req, res) => productController.list(req, res));
router.get('/products/name', authenticateToken, (req, res) => productController.findByName(req, res));
router.get('/products/mark', authenticateToken, (req, res) => productController.findByMark(req, res));
router.get('/products/category/:categoryId', authenticateToken, (req, res) => productController.findByCategory(req, res));
router.get('/products/user/:userId', authenticateToken, (req, res) => productController.findByUser(req, res));
router.get('/products/search', authenticateToken, (req, res) => productController.search(req, res));
router.get('/products/:id', authenticateToken, (req, res) => productController.findById(req, res));

export { router as productRoutes };
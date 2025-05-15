import { Router } from 'express';
import { PriceListController } from '../controllers/pricelist.controller';
import { authenticateToken } from '../middleware/authenticateToken';

const router = Router();
const priceListController = new PriceListController();

router.post('/pricelists', authenticateToken, (req, res) => priceListController.create(req, res));
router.put('/pricelists/:id', authenticateToken, (req, res) => priceListController.update(req, res));
router.delete('/pricelists/:id', authenticateToken, (req, res) => priceListController.delete(req, res));
router.get('/pricelists', authenticateToken, (req, res) => priceListController.list(req, res));
router.get('/pricelists/sales', authenticateToken, (req, res) => priceListController.listSale(req, res));
router.get('/pricelists/product/:productId', authenticateToken, (req, res) => priceListController.findByProduct(req, res));
router.get('/pricelistsenterprise/:enterpriseId', authenticateToken, (req, res) => priceListController.findByEnterprise(req, res));
router.get('/pricelists/:id', authenticateToken, (req, res) => priceListController.findById(req, res));

export { router as priceListRoutes };
import { Router } from 'express';
import { EnterpriseController } from '../controllers/enterprise.controller';
import { authenticateToken } from '../middleware/authenticateToken';

const router = Router();
const enterpriseController = new EnterpriseController();

router.post('/enterprises', authenticateToken, (req,res) => enterpriseController.create(req,res));
router.get('/enterprises/search', authenticateToken, (req,res) => enterpriseController.search(req,res));
router.put('/enterprises/:id', authenticateToken,(req,res) => enterpriseController.update(req,res));

router.delete('/enterprises/:id', authenticateToken, (req,res) => enterpriseController.delete(req,res));
router.get('/enterprises', authenticateToken,(req,res) => enterpriseController.list(req,res));
router.get('/enterprises/search/name', authenticateToken, (req,res) => enterpriseController.findByName(req,res));
router.get('/enterprises/user/:userId', authenticateToken, (req,res) => enterpriseController.findByUser(req,res));


router.get('/enterprises/:id', authenticateToken, (req,res) => enterpriseController.findById(req,res));

export {router as enterpriseRoutes};
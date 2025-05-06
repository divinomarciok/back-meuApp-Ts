import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticateToken } from '../middleware/authenticateToken';
import { validateUser } from '../middleware/validate.UserCreate';

const router = Router();
const userController = new UserController();

router.post('/users',validateUser,(req, res) => userController.create(req, res));
router.get('/users',authenticateToken, (req, res) => userController.list(req, res));
router.get('/users/:id',authenticateToken, (req, res) => userController.findById(req, res));
router.post('/users/email/',authenticateToken, (req, res) => userController.findByEmail(req, res));//rota findbyemail utilizando método post para evitar expor dados na url do get
router.post('/users/login/', (req,res)=>userController.findByLogin(req,res));
router.put('/users/:id', authenticateToken,(req, res) => userController.update(req, res));
router.delete('/users/:id', authenticateToken,(req, res) => userController.delete(req, res));

export { router as userRoutes };
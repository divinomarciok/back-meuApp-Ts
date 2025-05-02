import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();
const userController = new UserController();

router.post('/users', (req, res) => userController.create(req, res));
router.get('/users', (req, res) => userController.list(req, res));
router.get('/users/:id', (req, res) => userController.findById(req, res));
router.post('/users/email/', (req, res) => userController.findByEmail(req, res));//rota findbyemail utilizando método post para evitar expor dados na url do get
router.put('/users/:id', (req, res) => userController.update(req, res));
router.delete('/users/:id', (req, res) => userController.delete(req, res));

export { router as userRoutes };
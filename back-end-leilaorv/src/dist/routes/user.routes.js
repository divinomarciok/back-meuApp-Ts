"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const authenticateToken_1 = require("../middleware/authenticateToken");
const validate_UserCreate_1 = require("../middleware/validate.UserCreate");
const router = (0, express_1.Router)();
exports.userRoutes = router;
const userController = new user_controller_1.UserController();
router.post('/users', validate_UserCreate_1.validateUser, (req, res) => userController.create(req, res));
router.get('/users', authenticateToken_1.authenticateToken, (req, res) => userController.list(req, res));
router.get('/users/:id', authenticateToken_1.authenticateToken, (req, res) => userController.findById(req, res));
router.post('/users/email/', authenticateToken_1.authenticateToken, (req, res) => userController.findByEmail(req, res)); //rota findbyemail utilizando método post para evitar expor dados na url do get
router.post('/users/login/', (req, res) => userController.findByLogin(req, res));
router.put('/users/:id', authenticateToken_1.authenticateToken, (req, res) => userController.update(req, res));
router.delete('/users/:id', authenticateToken_1.authenticateToken, (req, res) => userController.delete(req, res));

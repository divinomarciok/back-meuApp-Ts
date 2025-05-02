"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
exports.userRoutes = router;
const userController = new user_controller_1.UserController();
router.post('/users', (req, res) => userController.create(req, res));
router.get('/users', (req, res) => userController.list(req, res));
router.get('/users/:id', (req, res) => userController.findById(req, res));
router.post('/users/email/', (req, res) => userController.findByEmail(req, res)); //rota findbyemail utilizando método post para evitar expor dados na url do get
router.put('/users/:id', (req, res) => userController.update(req, res));
router.delete('/users/:id', (req, res) => userController.delete(req, res));

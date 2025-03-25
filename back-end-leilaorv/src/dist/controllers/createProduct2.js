"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createproduct2 = void 0;
const multer_1 = __importDefault(require("multer"));
const db_datasource_1 = require("../config/db.datasource");
const product_1 = require("../models/product");
const user_1 = require("../models/user");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
const createproduct2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { name, category, img_url, unidade_measure, weigth, description } = req.body;
    try {
        const productRepository = db_datasource_1.AppDataSource.getRepository(product_1.Product);
        const userRepository = db_datasource_1.AppDataSource.getRepository(user_1.User);
        if (typeof req.user !== 'object' || req.user === null || !('id' in req.user)) {
            res.status(401).json({ message: 'Usuário não autenticado' });
            return;
        }
        const userId = req.user.id;
        // Verifica se o usuário existe
        const user = yield userRepository.findOne({ where: { id: userId } });
        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }
        const existingProduct = yield productRepository.findOne({ where: { name } });
        if (existingProduct) {
            res.status(400).json({ message: 'Produto já cadastrado' });
            return;
        }
        const productData = productRepository.create({
            name: req.body.name,
            mark: req.body.mark,
            category: req.body.category,
            description: (_a = req.body) === null || _a === void 0 ? void 0 : _a.description,
            weigth: req.body.weigth,
            img_url: (_b = req.file) === null || _b === void 0 ? void 0 : _b.path,
            unidade_measure: (_c = req.body) === null || _c === void 0 ? void 0 : _c.unidade_measure,
            user: user
        });
        const saveProduct = yield productRepository.save(productData);
        res.status(201).json({
            message: 'Produto criado com sucesso!',
            product: { id: saveProduct.id, nomeProd: saveProduct.name, categoriaProd: saveProduct.category },
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao criar produto' });
    }
});
exports.createproduct2 = createproduct2;

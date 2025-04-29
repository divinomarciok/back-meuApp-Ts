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
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const productService_1 = require("../service/productService"); // ou caminho correto
const serviceProduct = new productService_1.ProductService;
exports.productController = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newProduct = yield serviceProduct.create(req.body);
            //return 
            res.status(201).json(newProduct);
        }
        catch (error) {
            //return 
            res.status(400).json({ error: error.message });
        }
    }),
    listAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const products = yield serviceProduct.findAll();
            res.status(200).json(products);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
};

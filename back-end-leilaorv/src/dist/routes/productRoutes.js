"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const routesProduct = (0, express_1.Router)();
console.log(typeof productController_1.productController.listAll);
routesProduct.get("/teste", productController_1.productController.listAll);
routesProduct.post("/product", productController_1.productController.create);
exports.default = routesProduct;

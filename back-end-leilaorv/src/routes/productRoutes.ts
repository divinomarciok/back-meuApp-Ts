import { Router } from 'express';
import { productController } from '../controllers/productController';


const routesProduct = Router();
console.log(typeof productController.listAll)
routesProduct.get("/teste", productController.listAll);
routesProduct.post("/product", productController.create);

export default routesProduct;

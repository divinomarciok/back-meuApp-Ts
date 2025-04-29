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
exports.ProductService = void 0;
const db_datasource_1 = require("../config/db.datasource");
const product_1 = require("../models/product");
const user_1 = require("../models/user");
const category_1 = require("../models/category");
const productRepo = db_datasource_1.AppDataSource.getRepository(product_1.Product);
const userRepo = db_datasource_1.AppDataSource.getRepository(user_1.User);
const categoRepo = db_datasource_1.AppDataSource.getRepository(category_1.Category);
class ProductService {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, mark, category: categoryIdentifier, description, weigth, img_url, unidade_measure, userId } = data;
            const existingProduct = yield productRepo.findOne({ where: { name } });
            if (existingProduct) {
                throw new Error(existingProduct.name + " <<< Produto já existe no banco");
            }
            const user = yield userRepo.findOne({ where: { id: userId } });
            if (!user) {
                throw new Error("Usuário não existe para cadastrar produto");
            }
            const category = yield categoRepo.findOne({ where: { name: categoryIdentifier } });
            if (!category) {
                throw new Error("Categoria não existe para cadastro");
            }
            const newProduct = productRepo.create({ name, mark, category, description, weigth, img_url, unidade_measure, user });
            return productRepo.save(newProduct);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return productRepo.find({ relations: ["category", "user"] });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield productRepo.findOne({ where: { id }, relations: ["category", "user"] });
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield productRepo.findOneBy({ id });
            if (!product)
                return null;
            Object.assign(product, data);
            return productRepo.save(product);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield productRepo.delete(id);
            return result.affected !== 0;
        });
    }
}
exports.ProductService = ProductService;
/*export const createProduct = async (dados: ProductPayload): Promise<Product> => {

    const { name, mark, category: categoryIdentifier, description, weigth, img_url, unidade_measure, userId } = dados;

    const existingProduct = await productRepo.findOne({ where: { name } });
    if (existingProduct) {
        throw new Error("Produto já existe");
    }

    const user = await userRepo.findOne({ where: { id: userId } });
    if (!user) {
        throw new Error('Usuário id não existe');
    }

    const category = await categoRepo.findOne({ where: { name: categoryIdentifier } }); // Adjust the 'where' clause based on how you identify categories
    if (!category) {
        throw new Error(`Categoria "${categoryIdentifier}" não encontrada`);
    }

    const product = productRepo.create({
        name,
        mark,
        category,
        description,
        weigth,
        img_url,
        unidade_measure,
        user
    });

    return productRepo.save(product);
}

export const listAllProduct = async (): Promise<Product[]> => {
    return await productRepo.find();
}*/ 

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
exports.ProductRepository = void 0;
const db_datasource_1 = require("../config/db.datasource");
const product_1 = require("../models/product");
const base_repository_1 = require("./base/base.repository");
class ProductRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(db_datasource_1.AppDataSource.getRepository(product_1.Product));
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository
                .createQueryBuilder('product')
                .leftJoinAndSelect('product.category', 'category')
                .where('LOWER(product.name) LIKE LOWER(:name)', { name: `%${name}%` })
                .getMany();
        });
    }
    findByMark(mark) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.find({
                where: { mark: mark },
                relations: ['category']
            });
        });
    }
    findByCategory(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.find({
                where: { category: { id: categoryId } },
                relations: ['category']
            });
        });
    }
    findByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.find({
                where: { user: { id: userId } },
                relations: ['category', 'user']
            });
        });
    }
    findByIdWithRelations(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOne({
                where: { id: id },
                relations: ['category']
            });
        });
    }
    listWithRelations() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.find({
                relations: ['category']
            });
        });
    }
    searchByText(searchText) {
        return __awaiter(this, void 0, void 0, function* () {
            // Usando o operador LIKE para buscar texto parcial
            return this.repository
                .createQueryBuilder('product')
                .leftJoinAndSelect('product.category', 'category')
                .leftJoinAndSelect('product.user', 'user')
                .where('LOWER(product.name) LIKE LOWER(:searchText)', { searchText: `%${searchText}%` })
                // .orWhere('LOWER(product.description) LIKE LOWER(:searchText)', { searchText: `%${searchText}%` })
                .getMany();
        });
    }
}
exports.ProductRepository = ProductRepository;

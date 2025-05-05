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
exports.CategoryRepository = void 0;
const db_datasource_1 = require("../config/db.datasource");
const category_1 = require("../models/category");
const base_repository_1 = require("./base/base.repository");
class CategoryRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(db_datasource_1.AppDataSource.getRepository(category_1.Category));
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.find({
                where: { name: name }
            });
        });
    }
    searchByText(searchText) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository
                .createQueryBuilder('category')
                .where('LOWER(category.name) LIKE LOWER(:searchText)', { searchText: `%${searchText}%` })
                .orWhere('LOWER(category.description) LIKE LOWER(:searchText)', { searchText: `%${searchText}%` })
                .getMany();
        });
    }
    existsByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.repository.count({
                where: { name: name }
            });
            return count > 0;
        });
    }
}
exports.CategoryRepository = CategoryRepository;

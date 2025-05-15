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
exports.PriceListRepository = void 0;
const db_datasource_1 = require("../config/db.datasource");
const pricelist_1 = require("../models/pricelist");
const base_repository_1 = require("./base/base.repository");
class PriceListRepository extends base_repository_1.BaseRepository {
    constructor() {
        super(db_datasource_1.AppDataSource.getRepository(pricelist_1.PriceList));
    }
    findByProductId(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository
                .createQueryBuilder('price_list')
                .leftJoinAndSelect('price_list.product', 'product')
                .leftJoinAndSelect('price_list.enterprise', 'enterprise')
                //.leftJoinAndSelect('price_list.user', 'user')
                .where('product.id = :productId', { productId })
                .getMany();
        });
    }
    findByEnterpriseId(enterpriseId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository
                .createQueryBuilder('price_list')
                .leftJoinAndSelect('price_list.product', 'product')
                .leftJoinAndSelect('price_list.enterprise', 'enterprise')
                //    .leftJoinAndSelect('price_list.user', 'user')
                .where('enterprise.id = :enterpriseId', { enterpriseId })
                .getMany();
        });
    }
    findByIdWithRelations(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.findOne({
                where: { id: id },
                relations: ['product', 'enterprise',]
            });
        });
    }
    findBySale() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.find({
                where: { isSale: true },
                relations: ['product', 'enterprise']
            });
        });
    }
    listWithRelations() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.find({
                relations: ['product', 'enterprise']
            });
        });
    }
}
exports.PriceListRepository = PriceListRepository;

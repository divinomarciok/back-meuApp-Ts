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
exports.PriceListService = void 0;
const pricelist_repository_1 = require("../repositories/pricelist.repository");
const pricelist_1 = require("../models/pricelist");
const product_repository_1 = require("../repositories/product.repository");
const enterprise_repository_1 = require("../repositories/enterprise.repository");
const user_respository_1 = require("../repositories/user.respository");
class PriceListService {
    constructor() {
        this.priceListRepository = new pricelist_repository_1.PriceListRepository();
        this.productRepository = new product_repository_1.ProductRepository();
        this.enterpriseRepository = new enterprise_repository_1.EnterpriseRepository();
        this.userRepository = new user_respository_1.UserRepository();
    }
    createPriceList(priceListData, userId, productId, enterpriseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByid(userId);
            if (!user) {
                throw new Error('Usuário não encontrado');
            }
            const product = yield this.productRepository.findByid(productId);
            if (!product) {
                throw new Error('Produto não encontrado');
            }
            const enterprise = yield this.enterpriseRepository.findByid(enterpriseId);
            if (!enterprise) {
                throw new Error('Empresa não encontrada');
            }
            const priceList = new pricelist_1.PriceList();
            priceList.price = priceListData.price;
            priceList.date_start = priceListData.date_start || new Date();
            priceList.isSale = priceListData.isSale || false;
            priceList.user = user;
            priceList.product = product;
            priceList.enterprise = enterprise;
            return this.priceListRepository.create(priceList);
        });
    }
    updatePriceList(id, priceListData, productId, enterpriseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingPriceList = yield this.priceListRepository.findByid(id);
            if (!existingPriceList) {
                throw new Error('Lista de preço não encontrada');
            }
            const updateData = Object.assign({}, priceListData);
            if (productId) {
                const product = yield this.productRepository.findByid(productId);
                if (!product) {
                    throw new Error('Produto não encontrado');
                }
                updateData.product = product;
            }
            if (enterpriseId) {
                const enterprise = yield this.enterpriseRepository.findByid(enterpriseId);
                if (!enterprise) {
                    throw new Error('Empresa não encontrada');
                }
                updateData.enterprise = enterprise;
            }
            const updateResult = yield this.priceListRepository.update(id, updateData);
            if (updateResult) {
                return this.priceListRepository.findByIdWithRelations(id);
            }
            return null;
        });
    }
    deletePriceList(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const priceList = yield this.priceListRepository.findByid(id);
            if (!priceList) {
                throw new Error('Lista de preço não encontrada');
            }
            return this.priceListRepository.delete(id);
        });
    }
    getPriceListById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.priceListRepository.findByIdWithRelations(id);
        });
    }
    listPriceLists() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.priceListRepository.listWithRelations();
        });
    }
    listPriceListsSale() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.priceListRepository.findBySale();
        });
    }
    findPriceListsByProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.priceListRepository.findByProductId(productId);
        });
    }
    findPriceListsByEnterprise(enterpriseId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.priceListRepository.findByEnterpriseId(enterpriseId);
        });
    }
}
exports.PriceListService = PriceListService;

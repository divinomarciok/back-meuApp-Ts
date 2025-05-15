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
exports.PriceListController = void 0;
const pricelist_service_1 = require("../service/pricelist.service");
class PriceListController {
    constructor() {
        this.priceListService = new pricelist_service_1.PriceListService();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const priceListData = req.body;
                const userId = req.user.id;
                const productId = Number(req.body.productId);
                const enterpriseId = Number(req.body.enterpriseId);
                if (!productId || !enterpriseId) {
                    res.status(400).json({ message: 'productId e enterpriseId são obrigatórios' });
                    return;
                }
                const priceList = yield this.priceListService.createPriceList(priceListData, userId, productId, enterpriseId);
                res.status(201).json(priceList);
            }
            catch (error) {
                console.error('Erro ao criar lista de preço:', error);
                res.status(400).json({ message: error.message || 'Erro ao criar lista de preço' });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const priceListData = req.body;
                const productId = req.body.productId ? Number(req.body.productId) : undefined;
                const enterpriseId = req.body.enterpriseId ? Number(req.body.enterpriseId) : undefined;
                const updatedPriceList = yield this.priceListService.updatePriceList(id, priceListData, productId, enterpriseId);
                if (!updatedPriceList) {
                    res.status(404).json({ message: 'Lista de preço não encontrada' });
                    return;
                }
                res.json(updatedPriceList);
            }
            catch (error) {
                console.error('Erro ao atualizar lista de preço:', error);
                res.status(400).json({ message: error.message || 'Erro ao atualizar lista de preço' });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const deleted = yield this.priceListService.deletePriceList(id);
                if (!deleted) {
                    res.status(404).json({ message: 'Lista de preço não encontrada' });
                    return;
                }
                res.status(204).send();
            }
            catch (error) {
                console.error('Erro ao deletar lista de preço:', error);
                res.status(500).json({ message: error.message || 'Erro ao deletar lista de preço' });
            }
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const priceList = yield this.priceListService.getPriceListById(id);
                if (!priceList) {
                    res.status(404).json({ message: 'Lista de preço não encontrada' });
                    return;
                }
                res.json(priceList);
            }
            catch (error) {
                console.error('Erro ao buscar lista de preço:', error);
                res.status(500).json({ message: 'Erro ao buscar lista de preço' });
            }
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const priceLists = yield this.priceListService.listPriceLists();
                res.json(priceLists);
            }
            catch (error) {
                console.error('Erro ao listar listas de preço:', error);
                res.status(500).json({ message: 'Erro ao listar listas de preço' });
            }
        });
    }
    listSale(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salePriceLists = yield this.priceListService.listPriceListsSale();
                res.json(salePriceLists);
            }
            catch (error) {
                console.error('Erro ao listar listas de preço em promoção', error);
                res.status(500).json({ message: 'Erro ao listar listas de preço em promoção' });
            }
        });
    }
    findByProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = Number(req.params.productId);
                const priceLists = yield this.priceListService.findPriceListsByProduct(productId);
                if (priceLists.length === 0) {
                    res.status(404).json({ message: 'Nenhuma lista de preço encontrada para este produto' });
                    return;
                }
                res.json(priceLists);
            }
            catch (error) {
                console.error('Erro ao buscar listas de preço por produto:', error);
                res.status(500).json({ message: 'Erro ao buscar listas de preço por produto' });
            }
        });
    }
    findByEnterprise(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const enterpriseId = Number(req.params.enterpriseId);
                const priceLists = yield this.priceListService.findPriceListsByEnterprise(enterpriseId);
                if (priceLists.length === 0) {
                    res.status(404).json({ message: 'Nenhuma lista de preço encontrada para esta empresa' });
                    return;
                }
                res.json(priceLists);
            }
            catch (error) {
                console.error('Erro ao buscar listas de preço por empresa:', error);
                res.status(500).json({ message: 'Erro ao buscar listas de preço por empresa' });
            }
        });
    }
}
exports.PriceListController = PriceListController;

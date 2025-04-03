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
exports.getProductPriceList = void 0;
const db_datasource_1 = require("../config/db.datasource");
const price_list_1 = require("../models/price_list");
const getProductPriceList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    try {
        const priceListReposity = db_datasource_1.AppDataSource.getRepository(price_list_1.PriceList);
        const productInlist = yield priceListReposity.find({
            where: {
                product: {
                    id: parseInt(productId, 10), // Certifique-se de converter para número
                },
            },
            relations: ['enterprise', 'product'],
        });
        if (!productInlist || productInlist.length === 0) {
            res.status(404).json({ message: 'Nenhuma associação encontrada para o produto' });
            return;
        }
        // Formatando o resultado para retornar somente as informações necessárias
        const formatedPriceList = productInlist.map(ep => {
            var _a;
            return ({
                nameProd: ep.product.name,
                mark: ep.product.mark,
                price: ep.price,
                isSale: ep.isSale,
                enterprise: (_a = ep.enterprise) === null || _a === void 0 ? void 0 : _a.name,
                un: ep.product.unidade_measure,
                weigth: ep.product.weigth,
                img_url: ep.product.img_url
            });
        });
        res.status(200).json(formatedPriceList);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar dados da associação enterprise_products' });
    }
});
exports.getProductPriceList = getProductPriceList;

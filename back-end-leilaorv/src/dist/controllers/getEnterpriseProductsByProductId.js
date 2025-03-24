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
exports.getEnterpriseProductsByProductId = void 0;
const db_datasource_1 = require("../config/db.datasource");
const price_list_1 = require("../models/price_list");
const getEnterpriseProductsByProductId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    try {
        const enterpriseProductsRepository = db_datasource_1.AppDataSource.getRepository(price_list_1.PriceList);
        // Como 'product' é um relacionamento, precisamos passar um objeto para o campo 'where'
        const enterpriseProducts = yield enterpriseProductsRepository.find({
            where: {
                product: {
                    id: parseInt(productId, 10), // Certifique-se de converter para número
                },
            },
            relations: ['enterprise', 'product'],
        });
        if (!enterpriseProducts || enterpriseProducts.length === 0) {
            res.status(404).json({ message: 'Nenhuma associação encontrada para o produto' });
            return;
        }
        // Formatando o resultado para retornar somente as informações necessárias
        const formattedEnterpriseProducts = enterpriseProducts.map(ep => {
            var _a, _b;
            return ({
                //nome: ep.product?.nomeProd,
                //  tamanho: ep.product?.tamanhoProd,
                //marca: 'Marca Genérica', // Placeholder, caso precise de uma informação que não existe no modelo
                user: (_a = ep.user) === null || _a === void 0 ? void 0 : _a.nome,
                empresa: (_b = ep.enterprise) === null || _b === void 0 ? void 0 : _b.name,
                preco: ep.price,
            });
        });
        res.status(200).json(formattedEnterpriseProducts);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar dados da associação enterprise_products' });
    }
});
exports.getEnterpriseProductsByProductId = getEnterpriseProductsByProductId;

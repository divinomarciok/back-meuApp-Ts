"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProduct = void 0;
const validateProduct = (req, res, next) => {
    var _a, _b, _c;
    const productData = {
        name: req.body.name,
        mark: req.body.mark,
        category: req.body.category,
        weigth: req.body.weigth,
        unidade_measure: (_a = req.body) === null || _a === void 0 ? void 0 : _a.unidade_measure,
        description: (_b = req.body) === null || _b === void 0 ? void 0 : _b.description,
        img_url: (_c = req.file) === null || _c === void 0 ? void 0 : _c.path,
        user: req.body.user
        // product.user = userId;
    };
    console.log(productData.name);
    if (!productData.name || typeof productData.name !== 'string' || productData.name.length === 0) {
        res.status(400).json({ message: 'Nome do produto é obrigatório e deve ser uma string válida' });
        return;
    }
    if (productData.category && typeof productData.category !== 'string') {
        res.status(400).json({ message: 'Categoria do produto deve ser uma string' });
        return;
    }
    if (productData.weigth && typeof productData.weigth !== 'string') {
        res.status(400).json({ message: 'Tamanho do produto deve ser uma string' });
        return;
    }
    console.log(productData.unidade_measure);
    /*if (unidade_measure && (typeof unidade_measure !== 'number' || unidade_measure < 0)) {
        res.status(400).json({ message: 'Quantidade do produto deve ser um número maior ou igual a zero' });
        return;
    }*/
    next();
};
exports.validateProduct = validateProduct;

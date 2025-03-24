"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProduct = void 0;
const validateProduct = (req, res, next) => {
    const { nomeProd, categoriaProd, tamanhoProd, quantidadeProd } = req.body;
    if (!nomeProd || typeof nomeProd !== 'string' || nomeProd.length === 0) {
        res.status(400).json({ message: 'Nome do produto é obrigatório e deve ser uma string válida' });
        return;
    }
    if (categoriaProd && typeof categoriaProd !== 'string') {
        res.status(400).json({ message: 'Categoria do produto deve ser uma string' });
        return;
    }
    if (tamanhoProd && typeof tamanhoProd !== 'string') {
        res.status(400).json({ message: 'Tamanho do produto deve ser uma string' });
        return;
    }
    console.log(quantidadeProd);
    if (quantidadeProd && (typeof quantidadeProd !== 'number' || quantidadeProd < 0)) {
        res.status(400).json({ message: 'Quantidade do produto deve ser um número maior ou igual a zero' });
        return;
    }
    next();
};
exports.validateProduct = validateProduct;

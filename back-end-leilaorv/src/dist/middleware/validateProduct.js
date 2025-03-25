"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProduct = void 0;
const validateProduct = (req, res, next) => {
    const { name, category, weigth, unidade_measure } = req.body;
    if (!name || typeof name !== 'string' || name.length === 0) {
        res.status(400).json({ message: 'Nome do produto é obrigatório e deve ser uma string válida' });
        return;
    }
    if (category && typeof category !== 'string') {
        res.status(400).json({ message: 'Categoria do produto deve ser uma string' });
        return;
    }
    if (weigth && typeof weigth !== 'string') {
        res.status(400).json({ message: 'Tamanho do produto deve ser uma string' });
        return;
    }
    console.log(unidade_measure);
    /*if (unidade_measure && (typeof unidade_measure !== 'number' || unidade_measure < 0)) {
        res.status(400).json({ message: 'Quantidade do produto deve ser um número maior ou igual a zero' });
        return;
    }*/
    next();
};
exports.validateProduct = validateProduct;

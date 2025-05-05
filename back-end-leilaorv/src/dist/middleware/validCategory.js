"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validCategory = void 0;
const validCategory = (req, res, next) => {
    const { name, description } = req.body;
    if (!name || typeof name !== 'string' || name.length === 0) {
        res.status(400).json({ message: 'Nome da categoria é obrigatório e deve ser uma string válida' });
        return;
    }
};
exports.validCategory = validCategory;

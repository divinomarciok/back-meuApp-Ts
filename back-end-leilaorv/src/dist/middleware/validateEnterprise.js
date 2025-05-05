"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnterpriseData = void 0;
const validateEnterpriseData = (req, res, next) => {
    const { nomeEmp, cnpj, userId } = req.body;
    if (!nomeEmp || typeof nomeEmp !== 'string' || nomeEmp.length === 0) {
        res.status(400).json({ message: 'Nome da empresa é obrigatório e deve ser uma string' });
        return;
    }
    if (!cnpj || typeof cnpj !== 'string' || cnpj.length !== 14) {
        res.status(400).json({ message: 'CNPJ é obrigatório e deve ter 14 caracteres' });
        return;
    }
    if (!userId || typeof userId !== 'number') {
        res.status(400).json({ message: 'ID do usuário é obrigatório e deve ser um número' });
        return;
    }
    next();
};
exports.validateEnterpriseData = validateEnterpriseData;

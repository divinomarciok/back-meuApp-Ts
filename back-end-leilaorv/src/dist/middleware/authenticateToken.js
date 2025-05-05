"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta';
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ message: 'Token não fornecido' });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        // Passe os dados decodificados via argumento local
        //req.body.tokenData = decoded;
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(403).json({ message: 'Token inválido ou expirado' });
    }
};
exports.authenticateToken = authenticateToken;

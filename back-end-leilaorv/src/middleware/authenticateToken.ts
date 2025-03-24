import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta';

export const authenticateToken = (req: Request  & { user?: string | jwt.JwtPayload }, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {

        res.status(401).json({ message: 'Token não fornecido' });
        return;
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        // Passe os dados decodificados via argumento local
        //req.body.tokenData = decoded;
        
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Token inválido ou expirado' });
    }
};

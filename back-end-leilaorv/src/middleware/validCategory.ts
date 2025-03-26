import { Request, Response, NextFunction } from 'express';

export const validCategory = (req: Request, res: Response, next: NextFunction): void => {
    const { name, description } = req.body;

    if (!name || typeof name !== 'string' || name.length === 0) {
        res.status(400).json({ message: 'Nome da categoria é obrigatório e deve ser uma string válida' });
        return;
    }
    
}